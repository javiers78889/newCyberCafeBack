import type { Request,Response, NextFunction } from "express"

export const PaqueteUser = async (req:Request,res:Response,next:NextFunction) => {
    const paquetes =req.fpaquetes.get('usuario')
    const usuario = req.usuarios.get('usuario')

    if(paquetes === usuario || usuario === 'admin'){
        next()
    }else{
        res.status(401).json('No Autorizado')
    }
}