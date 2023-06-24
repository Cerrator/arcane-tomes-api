import { DataTypes, Model } from "sequelize";
import sequelize from "../core/db-connection";

export interface IUser {
    id?: number;
    email: string;
    password: string;
    username?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UsersModel extends Model<IUser> implements IUser {
    public readonly id!: number
    public email: string
    public username: string
    public password: string

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UsersModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelize
});

export default UsersModel;
