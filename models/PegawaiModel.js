import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Bidang from "./BidangModel.js";
import Pangkat from "./PangkatModel.js";
import Golongan from "./GolonganModel.js";

const {DataTypes} = Sequelize;

const Pegawai = db.define('pegawai', {
    id: {
        type: DataTypes.STRING(40),
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            notEmpty: true
        }
    },
    nip: {
        type: DataTypes.STRING(18),
        allowNull: true,
        unique: true
    },
    jenis_pegawai: {
        allowNull: false,
        type: DataTypes.ENUM({
            values: ['pns', 'kontrak', 'p3k', 'ptt']
        }),
        validate: {
            notEmpty: true,
        }
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tempat_lahir: {
        allowNull: false,
        type: DataTypes.STRING(200),
        validate: {
            notEmpty: true
        }
    },
    tanggal_lahir: {
        allowNull: false,
        type: DataTypes.STRING(11),
        validate: {
            notEmpty: true
        }
    },
    nama_jabatan: {
        allowNull: false,
        type: DataTypes.ENUM({
            values: ['pegawai', 'kaban', 'kabag', 'kasubag', 'sekban']
        }),
        validate: {
            notEmpty: true
        }
    },
    jabatan: {
        allowNull: true,
        type: DataTypes.TEXT('long'),
    },
    initial_jabatan: {
        allowNull: true,
        type: DataTypes.STRING(100)
    },
    masa_kerja_golongan: {
        allowNull: true,
        type: DataTypes.STRING(50)
    },
    diklat: {
        allowNull: true,
        type: DataTypes.TEXT('long')
    },
    pendidikan: {
        allowNull: true,
        type: DataTypes.STRING(200)
    },
    no_sk: {
        allowNull: true,
        type: DataTypes.STRING
    },
    no_rekening: {
        allowNull: true,
        type: DataTypes.STRING
    },
    nama_rekening: {
        allowNull: true,
        type: DataTypes.STRING(100)
    },
    umur: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate:{
            notEmpty: true
        }
    },
    jenis_kelamin: {
        allowNull: false,
        type: DataTypes.ENUM({
            values: ['pria','wanita']
        }),
        validate: {
            notEmpty: true
        }
    },
    agama: {
        type: DataTypes.ENUM({
            values: ['islam','kristern','hindu','budha','konghucu']
        }),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kenaikan_pangkat: {
        allowNull: true,
        type: DataTypes.STRING(100)
    },
    batas_pensiun: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    foto: {
        allowNull: true,
        type: DataTypes.STRING
    },
    url: {
        allowNull: true,
        type: DataTypes.STRING
    },
    pangkatId: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    golonganId: {
        type: DataTypes.STRING(40),
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

// relasi one to one bidang dengan pegawai
Bidang.hasOne(Pegawai);
Pegawai.belongsTo(Bidang, {foreignKey: 'bidangId'});

// relasi one to one pangkat dengan pegawai
Pangkat.hasOne(Pegawai);
Pegawai.belongsTo(Pangkat, {foreignKey: 'pangkatId'});

// relasi one to one golongan dengan pegawai
Golongan.hasOne(Pegawai);
Pegawai.belongsTo(Golongan, {foreignKey: 'golonganId'});

export default Pegawai;