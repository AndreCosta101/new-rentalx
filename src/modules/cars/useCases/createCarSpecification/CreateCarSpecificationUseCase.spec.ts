import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;
// let specificationsRepositoryInMemory : SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
    })

    it('should not be able to add a new specification to an inexistent car', async () => {
        expect( async () => {
            const car_id = '1234';
            const specifications_id = [ '54321']
    
            await createCarSpecificationUseCase.execute({car_id, specifications_id})
        }).rejects.toBeInstanceOf(AppError);
    })

    it('should be able to add a new specification to a car', async () => {
        const car  = await carsRepositoryInMemory.create({
            name : 'Car name' ,
            description : 'car description' ,
            daily_rate : 100 ,
            license_plate : 'ABC - a234' ,
            fine_amount : 60 ,
            brand :  'Brand',
            category_id : 'category' ,
        });
        const specifications_id = [ '54321']

        await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})
    })
})