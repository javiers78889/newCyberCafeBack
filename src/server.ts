import express from 'express';
import router from './router';
import cors from 'cors';
import db from './config/db';
import helmet from 'helmet';


async function connectDB(){
  try {

    await db.authenticate()
    db.sync()
    console.log('Conexion exitosa')
    
  } catch (error) {
    console.log(error)
    console.log('Hubo un error al conectarse a la base de datos')
    
  }
}
connectDB();

const server = express();
server.use(cors({
  origin: '*', // Permite solicitudes de todos los orígenes (ajustar según sea necesario)
}));

server.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
    scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"], // Ajusta según tus necesidades
    styleSrc: ["'self'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    connectSrc: ["'self'", "https://api.example.com"], // Ajusta según tus necesidades
    frameSrc: ["'none'"]
  }
}));


server.use(express.json())

server.use('/', router);

export default server;
