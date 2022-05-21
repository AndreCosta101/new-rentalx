import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}


export async function ensuredAuthenticated(request: Request, response:Response, next:NextFunction) {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Error("Missing token")
    }

    const [, token ] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(token, 'e84c55c90d955bf1cfa2d31a1f425383') as IPayload;

        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new Error('User does not exist')
        }

        next()
    } catch (error) {
        throw new Error('Invalid token')
    }
}