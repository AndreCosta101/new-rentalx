import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}


@injectable()
class CreateCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carRepository: ICarsRepository
    ){}

    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: IRequest): Promise<Car>{

        const carAlreadyExists = await this.carRepository.findByLicensePlate(license_plate);

        if(carAlreadyExists){
            throw new AppError('Car already exists')
        }

        const car = await this.carRepository.create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        })
        

        return car;
    }

}

export { CreateCarUseCase}