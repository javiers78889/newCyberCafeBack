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

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use('/', router);

export default server;
