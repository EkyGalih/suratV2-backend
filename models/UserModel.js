import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pegawai from "./PegawaiModel.js";

const {DataTypes} = Sequelize;

const Users = db.define('Users', {
    id: {
        type: DataTypes.STRING(40),
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            notEmpty: true
        }
    },
    nama_lengkap: {
        allowNull: false,
        type: DataTypes.STRING(100),
        validate: {
            notEmpty: true
        }
    },
    level: {
        allowNull: false,
        type: DataTypes.ENUM({
            values: ['admin', 'pimpinan', 'agendaris', 'user']
        }),
        validate: {
            notEmpty: true
        }
    },
    pegawaiId: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
});


Pegawai.hasOne(Users);
Users.belongsTo(Pegawai);

export default Users;