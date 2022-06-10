import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ReturningRentalUseCase } from './ReturningRentalUseCase';


class ReturningRentalController {

    async handle(request: Request, response: Response): Promise<Response>{
        const { id: user_id } = request.user;
        const {id}= request.params

        const returningRentalUseCase = container.resolve(ReturningRentalUseCase)

        const rental = await returningRentalUseCase.execute({
            id,
            user_id
        })

        return response.status(200).json(rental)


    }
}

export { ReturningRentalController}