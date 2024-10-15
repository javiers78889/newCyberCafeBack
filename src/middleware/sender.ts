import Twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSidd = process.env.ACCOUNT_SSID;
const authTokenn = process.env.AUTH_TOKEN

// Configuración de Twilio
const accountSid = accountSidd;
const authToken = authTokenn;
const client = Twilio(accountSid, authToken);

export const Sender = async ({ nombre, telefono, tracking, precio }) => {

    try {
        
        const message = await client.messages.create({
            body: `¡Hola ${nombre}!\n\nSomos CyberCafe Chame ☕,\n\nLe informamos que ha recibido un nuevo paquete📦: \n\n\t📍ID Tracking: ${tracking} \n\t💵Total: $${precio} \n\nPuede verificar su factura a través de nuestra plataforma.`,
            from: 'whatsapp:+50765281534', // Número de WhatsApp del Sandbox de Twilio
            to: `whatsapp:${'+507' + telefono}`
        });
        if(message){
            
         console.log('Mensaje enviado:', telefono + message.sid);
         
        }
    } catch (error) {
        
        return console.error('Error')
    }

}