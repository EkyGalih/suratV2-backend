import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Surat from "./SuratModel.js";

const {DataTypes} = Sequelize;

const FileSurat = db.define('file_surat', {
    id: {
        type: DataTypes.STRING(40),
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    file: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    path_file: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lampiran: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    path_lampiran: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    suratId: {
        type : DataTypes.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Surat.hasOne(FileSurat);
FileSurat.belongsTo(Surat, {foreignKey: 'suratId'});

export default FileSurat;