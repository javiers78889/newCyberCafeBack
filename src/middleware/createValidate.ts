import type { Request, Response, NextFunction } from 'express'
import Users from '../models/users.model'

declare global {
    namespace Express {
        interface Request {
            create?: Users
        }
    }
}

export const CreateExist = async (req: Request, res: Response, next: NextFunction) => {
    const { correo } = req.body
    req.datos = await Users.findOne({ where: { correo } })

   
    if (req.datos) {
        res.status(409).json('Este usuario ya existe')
    } else {
        next()
    }
}