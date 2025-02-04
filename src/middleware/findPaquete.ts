import Paquetes from "../models/paquetes.model"
import type { Request, Response, NextFunction } from 'express'
declare global {
    namespace Express {
        interface Request {
            fpaquetes?: Paquetes
        }
    }
}

export const findPaquete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const product = await Paquetes.findByPk(id)
    req.fpaquetes = product

    if(!product){
        res.status(404).json('Paquete No Encontrado')
    }else{
        next()
    }

}