import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'users'
})
class Users extends Model {
   
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    usuario!: string;
   
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    contraseña!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    isAuth!: boolean;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    nombre!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    plan!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    telefono!: string;
    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        validate: {
            isEmail: true
        }
    })
    correo!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    fechaNacimiento!: Date;

}

export default Users;
