

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "../../../../shared/errors/AppError"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase : SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory


describe('Send Forgot Mail', () =>{

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        mailProvider = new MailProviderInMemory()

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    })


    it('should be able to send a forgot password mail to user', async() => {
        const sendMail = jest.spyOn(mailProvider, "sendMail")

        await usersRepositoryInMemory.create({
            driver_license: "37431250",
            email: "oljega@vitpipi.tk",
            name: "Rosetta Romero",
            password: '1234'
        })

        await sendForgotPasswordMailUseCase.execute("oljega@vitpipi.tk")

        expect(sendMail).toHaveBeenCalled()
    })

    it('should not be able to send an email if user does not exist', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("wel@koef.cy")
        ).rejects.toEqual(new AppError('User does not exist'))
    })

    it('should be able to create a new token', async () =>{
        const generateToken = jest.spyOn(usersTokensRepositoryInMemory, "create")

        await usersRepositoryInMemory.create({
            driver_license: "3743250",
            email: "jaula@vitpipi.tk",
            name: "Rosetta 2 Romero",
            password: '1234'
        })

        await sendForgotPasswordMailUseCase.execute("jaula@vitpipi.tk")

        expect(generateToken).toBeCalled()
    })
})