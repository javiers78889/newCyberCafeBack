import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Users from '../models/users.model'
declare global {
    namespace Express {
        interface Request {
            usuarios?: Users
        }
    }
}
export const verifyToken = async  (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization

    if (!bearer) {
        const error = new Error('No autorizado')
        res.status(401).json({ error: error.message })
    }
    else {

        const [, token] = bearer.split(' ')

        if (!token) {
            const error = new Error('No autorizado')
            res.status(401).json({ error: error.message })
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRETO)

            if (typeof decoded === "object" && decoded.id) {

                const user = await Users.findByPk(decoded.id, {
                    attributes: ['id', 'name', 'email']
                })
                req.usuarios = user
                next()
            }
        } catch (error) {
            res.status(500).json({ error: 'Token no valido' })

        }

  

}
}