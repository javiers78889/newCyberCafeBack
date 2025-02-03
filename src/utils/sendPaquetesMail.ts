import transporter from "../config/nodemailer";
type Email = {
    id: number,
    usuario: string,
    correo: string,
    tracking: string,
    peso: number,
    precio: number,
    tarifas: number
}

export const SendPaquetes = async (user: Email) => {

    console.log(user.correo)
    const mailOptions = {
        from: process.env.EMAIL, // Remitente
        to: `${user.correo}`, // Destinatario (cambia esta dirección)
        subject: `Haz Recibido Un Paquete N° DE FACTURA FS-${user.id}`, // Asunto
        text: `No comparta con nadie`, // Cuerpo en texto plano
        html: `<h5 style="font-size: 22px">Hola ${user.usuario}. Ha recibido un paquete!</h5>
        </br>
        <header style="background-color: red;" width="80px">
            <img src="https://res.cloudinary.com/dkcwi8gob/image/upload/v1738549755/fete-blanco_utdqlo.png" width="80px" height="80px"/>
        </header>
        </br>
       
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <tr>
                <td style="padding: 8px; font-weight: 900; font-size: 20px">N° DE FACTURA FS-${user.id}</td>
            
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">R.U.C: 8-888-1754 DV.48</td>
            
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">Cambiamos de ubicacion</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">Teléfono: 6547-4870</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">Correo: cybercafechame@gmail.com</td>
            </tr>
        </table>
        
         </br>
         
         <table style="width: 100%; border-collapse: collapse; text-align: left;">
    <thead>
        <tr style="background-color: red; color: white;">
            <th style="padding: 10px; border: 1px solid white;">LIBRAS.</th>
            <th style="padding: 10px; border: 1px solid white;">DESCRIPCIÓN</th>
            <th style="padding: 10px; border: 1px solid white;">IMPORTE POR LIBRAS</th>
            <th style="padding: 10px; border: 1px solid white;">TOTAL</th>
        </tr>
    </thead>
    <tbody>
        <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd;">${user.peso}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${user.tracking}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${user.tarifas}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">$${user.precio}</td>
        </tr>
    </tbody>
</table>
</br>
<h1>TOTAL FACTURA $${user.precio}</h1>
</br>
<h6>CONDICIONES Y FORMA DE PAGO</h6>
<h5>MÁXIMO 7 DIAS CALENDARIO LIBRE DE ALMACENAJE DESPUES DE LA FECHA DE FACTURA.</h5>
</br>

<div style="background: yellow; padding: 10px; border-radius: 5px; width: fit-content;">
<p><strong>ASHLEY MOSQUERA</strong></p>
        <p>04-33-98-768227-8</p>
        <p><strong>CTA AHORRO</strong></p>
        <p>BANCO GENERAL.</p>
        <p><strong>YAPPY:</strong></p>
        <p>6547-4870</p>
      </div>  
    
         `, // Cuerpo en HTML (opcional)
    };
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(`Correo enviado a:${user.correo} ` + info.response);
    } catch (error) {
        console.log('Error al enviar el correo:', error);

    }

}