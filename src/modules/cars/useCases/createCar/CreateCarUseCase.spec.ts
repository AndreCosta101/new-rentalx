import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory : CarsRepositoryInMemory

describe('Create Car', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it('should be able to create a new car', async() => {
        const car  = await createCarUseCase.execute({
            name : 'Car name' ,
            description : 'car description' ,
            daily_rate : 100 ,
            license_plate : 'ABC - a234' ,
            fine_amount : 60 ,
            brand :  'Brand',
            category_id : 'category' ,
        });

        expect(car).toHaveProperty('id')
    })

    it('should not to be able to create a car with existent license plate', async() => {
        expect(async() => {
            await createCarUseCase.execute({
                name : 'Car1' ,
                description : 'car description' ,
                daily_rate : 100 ,
                license_plate : 'ABCDE' ,
                fine_amount : 60 ,
                brand :  'Brand',
                category_id : 'category' ,
            });

            await createCarUseCase.execute({
                name : 'Car2' ,
                description : 'car description' ,
                daily_rate : 100 ,
                license_plate : 'ABCDE' ,
                fine_amount : 60 ,
                brand :  'Brand',
                category_id : 'category' ,
            });
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should create a new car with available true by default', async() => {
       const car =  await createCarUseCase.execute({
            name : 'Available Car' ,
            description : 'car description' ,
            daily_rate : 100 ,
            license_plate : 'ABC - a234' ,
            fine_amount : 60 ,
            brand :  'Brand',
            category_id : 'category' ,
        });

        expect(car.available).toBe(true);
    })
})