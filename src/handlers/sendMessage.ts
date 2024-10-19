import { check, validationResult } from "express-validator";
import { Sender } from "../middleware/sender";
import { Request, Response } from 'express';

export const sendMessage = async (req: Request, res: Response) => {
    // Realiza las validaciones
    await check('tracking').notEmpty().withMessage('El tracking está vacío').run(req);
    await check('precio').isNumeric().withMessage('El precio debe ser numérico').notEmpty().withMessage('El precio está vacío').run(req);
    await check('nombre').notEmpty().withMessage('El nombre está vacío').run(req);
    await check('telefono').notEmpty().withMessage('El teléfono está vacío').run(req);

    // Verificar si hay errores en las validaciones
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)
    const { nombre, telefono, tracking, precio } = req.body;

    try {
        // Asegurarse de esperar a que la función Sender se ejecute si es asíncrona
        await Sender({ nombre, telefono, tracking, precio });
        res.status(201).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        // Manejar errores al enviar el mensaje
        res.status(500).json({ message: 'Error al enviar el mensaje', error });
    }
};
