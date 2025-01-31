import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

type DataToken = {
    id: string,
    nombre: string,
    correo: string
}

export const genetatejwt = ({ id, nombre, correo }: DataToken) => {
    return jwt.sign({ id, nombre, correo }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })


}