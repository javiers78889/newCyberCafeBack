import type { Request, Response, NextFunction } from 'express'
import Users from '../models/users.model'

export const verifyCorreo = async (req: Request, res: Response, next: NextFunction)  => {
    const {correo}= req.body

    const validar = await Users.findOne({where:{correo}})

    if(validar){
        res.status(409).json('Este Correo Ya esta en uso')
    }else{
        next()
    }
}