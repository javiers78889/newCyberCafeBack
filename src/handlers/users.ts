import { Request, Response } from 'express';
import Users from '../models/users.model';
import { genetatejwt } from '../utils/JWT';

export const createusers = async (req: Request, res: Response) => {

    const { contraseña, nombre, plan, telefono, correo } = req.body

    const Data = {
        usuario: `Evan-3 ${nombre}`,
        contraseña,
        plan,
        telefono,
        nombre,
        isAuth: false,
        correo
    }

    const users = await Users.create(Data);
    res.status(201).json('Usuario Creado Con exito');


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

export const UpdateAllUsers = async (req: Request, res: Response) => {
    const { id } = req.params

    console.log(id)
    const update = await Users.findByPk(id)

    await update.update(req.body)
    await update.save()
        .then(() => {
            res.status(201).json({ message: 'Usuario actualizado Correctamente' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al Actualizar el Usuario', error });
        });


}

export const Login = (req:Request, res:Response) => {

    const usuarios = req.usuarios


   const token = genetatejwt(usuarios.id)

   res.status(200).json(token)
    
}