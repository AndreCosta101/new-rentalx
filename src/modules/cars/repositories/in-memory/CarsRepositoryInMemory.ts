import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {


    cars: Car[] =[]

    async create({
        brand,
        category_id, 
        daily_rate,
        available,
        description,
        fine_amount,
        name,
        license_plate,
        id
    }: ICreateCarDTO): Promise<Car> {
        const car =  new Car();

        Object.assign(car, {
            id,
            brand,
            category_id, 
            daily_rate,
            description,
            fine_amount,
            name,
            license_plate,           
        })

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate)
    }

    async findAvailable(
        brand : string,
        category_id : string,
        name : string,
    ): Promise<Car[]> {
        const all = this.cars
            .filter(car => {
                if(
                    car.available === true ||
                    (
                        (brand && car.brand === brand) ||
                        (category_id && car.category_id  === category_id) ||
                        (name && car.name === name)
                    ) 
                ){
                    return car;
                }
            });

        return all;
    } 

    async findById(id: string): Promise<Car>{
        const car = this.cars.find(car => car.id === id)
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {

       const index =  this.cars.findIndex(car => car.id === id)
       this.cars[index].available = available
    }
}

export { CarsRepositoryInMemory }