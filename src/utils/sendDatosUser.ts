import transporter from "../config/nodemailer";
type Email = {
    usuario: string,
    nombre: string,
    password: string,
    correo:string
   
}

export const sendCredentials = async (user: Email) => {

    const mailOptions = {
        from: process.env.EMAIL, // Remitente
        to: `${user.nombre}`, // Destinatario (cambia esta dirección)
        subject: `Gracias Por Crear Una Cuenta Con Nosotros`, // Asunto
        text: `No comparta con nadie`, // Cuerpo en texto plano
        html: `<h5 style="font-size: 22px">Hola ${user.nombre}. aqui estan sus Credenciales!</h5>
        </br>
        <header style="background-color: red;" width="80px">
            <img src="https://res.cloudinary.com/dkcwi8gob/image/upload/v1738549755/fete-blanco_utdqlo.png" width="80px" height="80px"/>
        </header>
        </br>
         
         <table style="width: 100%; border-collapse: collapse; text-align: left;">
    <thead>
        <tr style="background-color: red; color: white;">
            <th style="padding: 10px; border: 1px solid white;">Usuario.</th>
            <th style="padding: 10px; border: 1px solid white;">contraseña</th>
        </tr>
    </thead>
    <tbody>
        <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd;">${user.usuario}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${user.password}</td>
          
        </tr>
    </tbody>
</table>
    
         `, // Cuerpo en HTML (opcional)
    };
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(`Correo enviado a:${user.correo} ` + info.response);
    } catch (error) {
        console.log('Error al enviar el correo:', error);

    }

}