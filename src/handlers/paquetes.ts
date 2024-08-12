import { Request, Response } from 'express';
import Paquetes from '../models/paquetes.model';
import { validationResult, check } from 'express-validator';
import Twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSidd = process.env.ACCOUNT_SSID;
const authTokenn = process.env.AUTH_TOKEN

// Configuración de Twilio
const accountSid = accountSidd;
const authToken = authTokenn;
const client = Twilio(accountSid, authToken);


export const createPaquetes = async (req: Request, res: Response) => {
    const paquetes = await Paquetes.create(req.body)
    await check('usuario').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
    await check('tracking').notEmpty().withMessage('El tracking esta Vacio').run(req)
    await check('peso').isNumeric().withMessage('El peso debe ser numerico').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
    await check('precio').isNumeric().withMessage('El precio debe ser numerico').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
    await check('tarifa').isNumeric().withMessage('El tarifa debe ser numerico').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
    const{nombre,telefono,tracking,precio}=req.body
    try {
        // Enviar mensaje a través de Twilio
        const message = await client.messages.create({
          body: `¡Hola ${nombre}!\n\nSomos FastShippingAGS✈️🚢,\n\nLe informamos que ha recibido un nuevo paquete📦: \n\n\t📍ID Tracking: ${tracking} \n\t💵Total: $${precio} \n\nPuede verificar su factura a través de nuestra plataforma.`,
          from: 'whatsapp:+50766592722', // Número de WhatsApp del Sandbox de Twilio
          to: `whatsapp:${'+507' + telefono}`
        });
  
        console.log('Mensaje enviado:', message.sid);
        res.status(201).send('Paquete creado y mensaje enviado exitosamente');
      } catch (error) {
        console.error('Error enviando mensaje:', error);
        res.status(500).send('Paquete creado pero no se pudo enviar el mensaje');
      }


}
export const selectPaquetes = async (req: Request, res: Response) => {
    try {
        const paquetes = await Paquetes.findAll({
            order: [
                ['id', 'DESC']
            ]
        })

        res.status(201).json({ data: paquetes });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' }); // Devuelve un estado 500 en caso de error
    }

}
export const updatePaquetes = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Paquetes.findByPk(id)

    console.log(req.body)
    await product.update(req.body)
    await product.save()

   

}