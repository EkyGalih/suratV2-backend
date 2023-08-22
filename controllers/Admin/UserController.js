import Pegawai from "../../models/PegawaiModel.js";
import Users from "../../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['id', 'nama_lengkap', 'level', 'username'],
            include: [{
                model: Pegawai,
                attributes: ['nip', 'name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['id', 'nama_lengkap', 'level', 'username'],
            where: {
                id: req.params.id
            },
            include: [{
                model: Pegawai,
                attributes: ['nip', 'name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { nama_lengkap, level, pegawaiId, username, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: 'password tidak cocokan' });
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            nama_lengkap: nama_lengkap,
            level: level,
            pegawaiId: pegawaiId,
            username: username,
            password: hashPassword
        });
        res.status(201).json({ msg: "User created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    const { nama_lengkap, level, pegawaiId, username, password, confPassword } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ msg: 'password tidak cocokan' });
    try {
        await Users.update({
            nama_lengkap: nama_lengkap,
            level: level,
            pegawaiId: pegawaiId,
            username: username,
            password: hashPassword
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User diperbaharui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}