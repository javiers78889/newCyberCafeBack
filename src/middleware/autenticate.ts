import { Request, Response, NextFunction } from "express";
import Users from "../models/users.model";

declare global {
    namespace Express {
        interface Request {
            user?: Users
        }
    }
}

export const autenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { correo } = req.body

    req.user = await Users.findOne({ where: { correo } })


    if (req.user) {
        next()
    } else {

        res.status(500).json('Usuario No Encontrado')
    }
}