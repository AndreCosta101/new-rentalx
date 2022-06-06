import dayjs from 'dayjs';


import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase : CreateRentalUseCase;

describe('Create Rental', () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    })

    it('should be able to create a new rental ', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '121212',
            expected_return_date: new Date(),
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    })

    it('should not be able to create a new rental if the user has an open rental', async () => {

        expect( async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: new Date(),
            });
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    })
})