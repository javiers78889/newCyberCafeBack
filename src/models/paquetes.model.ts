import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    tableName: 'paquetes'
})
class Paquetes extends Model {

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    usuario!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    tracking!: string;

    @Column({
        type: DataType.FLOAT(8,2),
        allowNull: false
    })
    peso!: number;

    @Column({
        type: DataType.FLOAT(8,2),
        allowNull: false
    })
    precio!: number;

    @Column({
        type: DataType.FLOAT(6,2),
        allowNull: false
    })
    tarifas!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    status!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    pago!: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    fecha!: Date;
}

export default Paquetes;
