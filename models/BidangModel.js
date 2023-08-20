import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Bidang = db.define('bidang', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.STRING(40),
        defaultValue: DataTypes.UUIDV4,
        validate: {
            notEmpty: true
        }
    },
    nama_bidang: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Bidang;