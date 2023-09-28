import { Sequelize } from "sequelize";

const db = new Sequelize('bpkad_surat', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

export default db;