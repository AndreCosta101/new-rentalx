import dayjs from 'dayjs';
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';


import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase : CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
    const dayAdd25hrs = dayjs().add(25, 'hour').toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            carsRepositoryInMemory,
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            );
    })

    it('should be able to create a new rental ', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '121212',
            expected_return_date: dayAdd25hrs,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    })

    it('should not be able to create a new rental if the user has an open rental', async () => {
        expect( async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: dayAdd25hrs,
            });
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: dayAdd25hrs,
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to create a new rental if the user has an open rental', async () => {
        expect( async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    })
})