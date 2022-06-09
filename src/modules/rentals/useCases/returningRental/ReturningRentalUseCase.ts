import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
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


    async execute({id, user_id} : IRequest) {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(id)
        let totalFee = 0;

        if(!rental) { throw new AppError('Rental does not exist.')}

        let chargedDays = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        )

        if(chargedDays <= 0){
            chargedDays = 1
        }

        const currentTime = this.dateProvider.dateNow();

        const delay = this.dateProvider.compareInDays(currentTime, rental.expected_return_date)

        if(delay > 0) {
            const fine = delay * car.fine_amount;
            totalFee = fine;
        }

        totalFee += chargedDays * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = totalFee;

        await this.rentalsRepository.create(rental)
        await this.carsRepository.updateAvailable(car.id, true);


        return rental;

    }
}

export {ReturningRentalUseCase }