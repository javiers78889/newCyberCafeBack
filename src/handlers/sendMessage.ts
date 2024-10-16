import { Sender } from "../middleware/sender"

export const sendMessage = async (req, res) => {
    try {
        await Sender(req.body); // Usa await si Sender es asincrónica
        res.status(201).json('Mensaje Reenviado');
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
};

