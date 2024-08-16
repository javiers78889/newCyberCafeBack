import { Request, Response } from 'express';
import Users from '../models/users.model';
import { validationResult, check } from 'express-validator';

export const createusers = async (req: Request, res: Response) => {

    await check('usuario').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
    await check('telefono').isNumeric().withMessage('El telefono debe ser numerico').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)

    let errors = validationResult(req)

    if (!errors.isEmpty()) {


        return res.status(400).json({ erros: errors.array() })

    }


    const users = await Users.create(req.body);

    


};

export const selectUsers = async (req: Request, res: Response) => {
    try {
        const users = await Users.findAll()

        res.status(201).json(users); // Devuelve el usuario creado con un estado 201 Created
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' }); // Devuelve un estado 500 en caso de error
    }
};
