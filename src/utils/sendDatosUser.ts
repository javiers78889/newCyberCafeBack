import transporter from "../config/nodemailer";

type Email = {
    usuario: string,
    nombre: string,
    password: string,
    correo: string;
};

export const sendCredentials = async (user: Email) => {
    const mailOptions = {
        from: process.env.EMAIL, // Remitente
        to: `${user.correo}`, // Destinatario
        subject: `Gracias Por Crear Una Cuenta Con Nosotros`, // Asunto
        text: `No comparta con nadie`, // Cuerpo en texto plano
        html: `
        <h5 style="font-size: 22px">Hola ${user.nombre}, aquí están sus credenciales:</h5>
        </br>
        <header style="background-color: red;" width="80px">
            <img src="https://res.cloudinary.com/dkcwi8gob/image/upload/v1738549755/fete-blanco_utdqlo.png" width="80px" height="80px"/>
        </header>
        </br>

        <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="background-color: red; color: white;">
                    <th style="padding: 10px; border: 1px solid white;">Usuario</th>
                    <th style="padding: 10px; border: 1px solid white;">Contraseña</th>
                </tr>
            </thead>
            <tbody>
                <tr style="background-color: #f5f5f5;">
                    <td style="padding: 10px; border: 1px solid #ddd;">${user.usuario}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${user.password}</td>
                </tr>
            </tbody>
        </table>

        <br>

        <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="background-color: red; color: white;">
                    <th style="padding: 10px; border: 1px solid white;">Dirección Aérea</th>
                    <th style="padding: 10px; border: 1px solid white;">Dirección Marítima</th>
                </tr>
            </thead>
            <tbody>
                <tr style="background-color: #f5f5f5;">
                    <td style="padding: 10px; border: 1px solid #ddd;">
                        <strong>Nombre:</strong> ${user.usuario} <br>
                        <strong>Dirección:</strong> 5401 NW 72ND AVE, Doral FL 33166 <br>
                        <strong>Ciudad:</strong> Doral <br>
                        <strong>Estado:</strong> Florida <br>
                        <strong>Código Postal:</strong> 33166 <br>
                        <strong>País:</strong> USA <br>
                        <strong>Teléfono:</strong> 305-3645238
                    </td>
                    <td style="padding: 10px; border: 1px solid #ddd;">
                        <strong>Nombre:</strong> EVAN3 OCEAN-${user.nombre} <br>
                        <strong>Dirección:</strong> 5401 NW 72ND AVE, Doral FL 33166 <br>
                        <strong>Ciudad:</strong> Doral <br>
                        <strong>Estado:</strong> Florida <br>
                        <strong>País:</strong> USA <br>
                        <strong>Código Postal:</strong> 33166 <br>
                        <strong>Teléfono:</strong> 305-3645238
                    </td>
                </tr>
            </tbody>
        </table>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a: ${user.correo} - ` + info.response);
    } catch (error) {
        console.log("Error al enviar el correo:", error);
    }
};
