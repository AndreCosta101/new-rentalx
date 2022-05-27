import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listAvailableCarsUseCase : ListAvailableCarsUseCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;

describe('list cars', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it('should be able to list all available cars', async () => {

        const car =  await carsRepositoryInMemory.create({
                name: "BMW X1",
                description: "carro luxo",
                daily_rate: 140.00,
                license_plate: "ZZZ -1212", 
                fine_amount: 180,
                brand: "BMW",
                category_id: "category_id"             
        })


        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    })

 
    it('should be able to list all available cars by name', async () => {

        const car =  await carsRepositoryInMemory.create({
                name: "BMW X3",
                description: "carro luxo",
                daily_rate: 140.00,
                license_plate: "ZZZ -1212", 
                fine_amount: 180,
                brand: "BMW",
                category_id: "category_id"             
        })


        const cars = await listAvailableCarsUseCase.execute({
            name: 'BMW X3'
        });

        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by brand', async () => {

        const car =  await carsRepositoryInMemory.create({
                name: "BMW X3",
                description: "carro luxo",
                daily_rate: 140.00,
                license_plate: "ZZZ -1212", 
                fine_amount: 180,
                brand: "BMW",
                category_id: "category_id"             
        })


        const cars = await listAvailableCarsUseCase.execute({
            brand: 'BMW'
        });

        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by category_id', async () => {

        const car =  await carsRepositoryInMemory.create({
                name: "BMW X3",
                description: "carro luxo",
                daily_rate: 140.00,
                license_plate: "ZZZ -1212", 
                fine_amount: 180,
                brand: "BMW",
                category_id: "category_id"             
        })


        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_id" 
        });

        expect(cars).toEqual([car])
    })

})