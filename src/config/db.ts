
import { Sequelize } from "sequelize-typescript";
import  Users  from "../models/users.model"
import  Paquetes  from "../models/paquetes.model"
import dotenv from 'dotenv';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;


const db = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    models: [Users,Paquetes]
});

console.log(databaseUrl);

export default db;
