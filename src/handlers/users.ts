import { Request, Response } from 'express';
import Users from '../models/users.model';
import { validationResult, check } from 'express-validator';

export const createusers = async (req: Request, res: Response) => {
    // Validar los campos de entrada
    await check('usuario')
        .notEmpty().withMessage('El nombre de Usuario esta Vacio')
        .run(req);
    await check('telefono')
        .isNumeric().withMessage('El telefono debe ser numerico')
        .notEmpty().withMessage('El Telefono esta Vacio')
        .run(req);

    // Obtener resultados de validación
    const errors = validationResult(req);
    
    // Si hay errores, retornar un mensaje
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Crear el usuario en la base de datos
    try {
        const user = await Users.create(req.body);
        res.status(201).json({ message: 'Usuario Creado Con exito', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
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

export const UpdateUsers = async (req: Request, res: Response) => {
    const { usuario, contraseña } = req.body;

    try {
        // Verifica si el usuario existe
        const user = await Users.findOne({ where: { usuario } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualiza la contraseña del usuario
        const [updateCount] = await Users.update(
            { contraseña }, // Nueva contraseña
            { where: { usuario } } // Usuario a actualizar
        );

        if (updateCount > 0) {
            return res.status(200).json({ message: 'Usuario actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};
