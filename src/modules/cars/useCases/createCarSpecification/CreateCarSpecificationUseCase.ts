import { inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";


interface IRequest {
    car_id: string;
    specifications_id: string[];
}

class CreateCarSpecificationUseCase {

    constructor(
        // @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        // private specificationsRepository : ISpecificationsRepository
    ) {}

    async execute({ car_id, specifications_id } : IRequest) : Promise<void> {

        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists) {
            throw new AppError('Car does not exist', 404);
        }
    }
}

export { CreateCarSpecificationUseCase }