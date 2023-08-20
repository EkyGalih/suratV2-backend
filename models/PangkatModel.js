import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Pangkat = db.define('pangkat', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.STRING(40),
        defaultValue: DataTypes.UUIDV4,
        validate: {
            notEmpty: true
        }
    },
    nama_pangkat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Pangkat;