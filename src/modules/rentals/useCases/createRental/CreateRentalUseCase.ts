import dayjs from 'dayjs';
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;

}


class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
    ){}



    async execute({
        user_id,
        car_id,
        expected_return_date
    } :IRequest): Promise<Rental> {
<<<<<<< HEAD

=======
>>>>>>> 23c382cbd41c7149555eb5423d8443eda20be2ab
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if(carUnavailable){
            throw new AppError('Car is unavailable')
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if (rentalOpenToUser){
            throw new AppError('There is a rental in progress for user')
        }

<<<<<<< HEAD
        const compare = dayjs(expected_return_date).diff(new Date(), 'hours')

        console.log( 'Compare date',compare)






=======
>>>>>>> 23c382cbd41c7149555eb5423d8443eda20be2ab
        const rental  = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
         })

         return rental
    }
}

export { CreateRentalUseCase }