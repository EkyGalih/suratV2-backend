import { Sequelize } from "sequelize";

const db = new Sequelize('bpkad_surat', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;