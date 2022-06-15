import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';


class SendForgotPasswordMailController {

    async execute(request: Request, response: Response): Promise<Response> {
        const {email} = request.body

        const sendForgotMailUseCase = container.resolve(
            SendForgotPasswordMailUseCase
        )

        sendForgotMailUseCase.execute(email)

        return response.send()
    }
}

export { SendForgotPasswordMailController }