import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Bidang from "./BidangModel.js";
import Surat from "./SuratModel.js";

const {DataTypes} = Sequelize;

const Distribusi = db.define('distribusi', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.STRING(40),
        defaultValue: DataTypes.UUIDV4,
        validate: {
            notEmpty: true
        }
    },
    bidangId: {
        allowNull: false,
        type: DataTypes.STRING(40),
        validate: {
            notEmpty: true
        }
    },
    suratId: {
        allowNull: false,
        type: DataTypes.STRING(40),
        validate: {
            notEmpty: true
        }
    },
    status_baca: {
        allowNull: false,
        type: DataTypes.ENUM({
            values: ['unread', 'read']
        }),
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Bidang.hasOne(Distribusi);
Distribusi.belongsTo(Bidang, {foreignKey: 'bidangId'});

Surat.hasOne(Distribusi);
Distribusi.belongsTo(Surat,{foreignKey:'suratId'});

export default Distribusi;