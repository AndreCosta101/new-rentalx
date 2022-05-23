import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}


export async function ensuredAuthenticated(request: Request, response:Response, next:NextFunction) {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Missing token", 401)
    }

    const [, token ] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(token, 'e84c55c90d955bf1cfa2d31a1f425383') as IPayload;

        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new AppError('User does not exist', 401)
        }

        request.user = {
            id: user_id
        }

        next()
    } catch (error) {
        throw new AppError('Invalid token', 401)
    }
}