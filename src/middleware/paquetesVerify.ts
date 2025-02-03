import type { Request, Response, NextFunction } from 'express'
import Paquetes from '../models/paquetes.model'


export const paquetesVerify = async (req: Request, res: Response, next: NextFunction) => {

    const{tracking}= req.body
    const verify = await Paquetes.findOne({where:{tracking}})

    if(verify){
        res.status(500).json('Este paquete ya esta registrado')
    }else{
        next()
    }
}