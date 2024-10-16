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
            template: {
                name: 'cybercafe',  // Cambiado al nombre de la nueva plantilla
                language: { code: 'es' },      // Código del idioma de la plantilla
                components: [{
                    type: 'body',
                    parameters: [
                        { type: 'text', text: nombre },  // {{1}} = nombre
                        { type: 'text', text: tracking },  // {{2}} = tracking
                        { type: 'text', text: precio },    // {{3}} = precio
                    ]
                }]
            }
        });
        if(message){
            
         console.log('Mensaje enviado:', telefono + message.sid);
         
        }
    } catch (error) {
        
        return console.error('Error')
    }

}
