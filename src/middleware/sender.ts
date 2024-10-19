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
            from: 'whatsapp:+50765281534', // Número de WhatsApp del Sandbox de Twilio
            to: `whatsapp:+507${telefono}`,
            contentSid: 'HXbdfe09330f0a8c09c9c1deabbafe6aea', // ID de la plantilla aprobada por WhatsApp
            contentVariables: JSON.stringify({
                1: nombre,
                2: tracking,
                3: precio
            })
        });
        if(message){
            
         console.log('Mensaje enviado:', telefono + message.sid);
         
        }
    } catch (error) {
        
        return console.error('Error',error)
    }

}
