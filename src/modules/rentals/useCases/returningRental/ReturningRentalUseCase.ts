import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";


interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class ReturningRentalUseCase {

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ){}


    async execute({id, user_id} : IRequest): Promise<Rental> {
        
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id)
        
        if(!rental) { throw new AppError('Rental does not exist.')}
        

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow(),
        )


        if(daily <= 0){
            daily = 1
        }


        const dateNow = this.dateProvider.dateNow();

        const delay = this.dateProvider.calculateDelay(dateNow, rental.expected_return_date )

        let total = 0;
        if(delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;
        console.log('total = ', total)

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental)
        await this.carsRepository.updateAvailable(car.id, true);


        return rental;

    }
}

export {ReturningRentalUseCase }