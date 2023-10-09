import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Surat from "./SuratModel";

const { DataTypes } = Sequelize;

const Disposisi = db.define('lembar_disposisi', {
    id: {
        type: DataTypes.STRING(40),
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            notEmpty: true
        },
        autoIncrement: false
    },
    suratId: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    no_agenda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tgl_keamanan: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            notEmpty: false,
        }
    },
    tgl_paraf: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    paraf: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Surat.hasOne(Disposisi);
Disposisi.belongsTo(Surat, { foreignKey: 'suratId' });

export default Disposisi;