import { check } from "express-validator";
import { Sender } from "../middleware/sender";
import { Request, Response } from 'express';

export const sendMessage = async (req: Request, res: Response) => {
    await check('tracking').notEmpty().withMessage('El tracking esta Vacio').run(req)
    await check('precio').isNumeric().withMessage('El precio debe ser numerico').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
    Sender(req.body)


    res.status(201).json('Todo Bien')
};
