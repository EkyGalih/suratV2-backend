import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Bidang from "./BidangModel.js";

const { DataTypes } = Sequelize;

const Surat = db.define('surat', {
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
    jenis_surat: {
        type: DataTypes.ENUM({
            values: ['masuk', 'keluar']
        }),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kategori: {
        type: DataTypes.ENUM({
            values: ['biasa', 'sppd', 'undangan']
        }),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tgl_terima: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    asal_surat: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tgl_surat: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    no_surat: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    perihal: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    diteruskan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isi_disposisi: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    catatan: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status_surat: {
        type: DataTypes.ENUM({
            values: ['proggress', 'unread', 'read', 'done']
        }),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    bidangId: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Bidang.hasMany(Surat);
Surat.belongsTo(Bidang, { foreignKey: 'bidangId' });

export default Surat;