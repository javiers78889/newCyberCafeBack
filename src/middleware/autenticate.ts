import { Request, Response, NextFunction } from "express";
import Users from "../models/users.model";

declare global {
    namespace Express {
        interface Request {
            usuarios?: Users
        }
    }
}

export const autenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { usuario } = req.body

    const findUser = await Users.findOne({ where: {usuario} })
    req.usuarios = findUser

    if (findUser) {
        next()
    } else {

        res.status(404).json('Usuario No Encontrado')
    }
}