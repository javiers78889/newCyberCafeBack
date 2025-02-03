import type { Request, Response, NextFunction } from 'express'
import Paquetes from '../models/paquetes.model'

declare global {
    namespace Express {
        interface Request {
            paqueteria?: Paquetes
        }
    }
}

export const GenerarPaquete = async (req: Request, res: Response, next: NextFunction) => {

    const { plan, peso,usuario,tracking } = req.body
    req.paqueteria = req.body
    let tarifas: number
    let precio: number
    const pesaje = parseFloat(peso).toFixed(2)

    if (plan === 'aereo') {
        tarifas = 3.25
        precio = tarifas * parseFloat(pesaje);
    } else {
        tarifas = 7.50
        precio = tarifas * parseFloat(pesaje);
    }
    req.paqueteria.usuario= usuario
    req.paqueteria.tracking = tracking
    req.paqueteria.peso = peso
    req.paqueteria.precio = precio
    req.paqueteria.tarifas= tarifas
    req.paqueteria.status = 'Pendiente ⬜'
    req.paqueteria.pago = 'Pendiente ⬜'
    

    next()
}