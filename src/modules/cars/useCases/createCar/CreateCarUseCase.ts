import { inject, injectable } from "tsyringe";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../repositories/ICarsRepository";


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
    }: ICreateCarDTO): Promise<void>{
        this.carRepository.create({
            brand,
            category_id, 
            daily_rate,
            description,
            fine_amount,
            name,
            license_plate,
        })
    }

}

export { CreateCarUseCase}