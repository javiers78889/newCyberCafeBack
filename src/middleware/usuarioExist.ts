import type { Request, Response, NextFunction } from 'express'
import Users from '../models/users.model'

declare global {
    namespace Express {
        interface Request {
            datos?: Users
        }
    }
}

export const usuarioExist = async (req: Request, res: Response, next: NextFunction) => {
    const { usuario } = req.body
    req.datos = await Users.findOne({ where: { usuario } })

   
    if (!req.datos) {
        res.status(404).json('usuario no existe')
    } else {
        
        next()
    }
}