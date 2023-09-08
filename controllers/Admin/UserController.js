import { Op } from "sequelize";
import Pegawai from "../../models/PegawaiModel.js";
import Users from "../../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 11;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Users.count({
            where: {
                [Op.or]: [{
                    username: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    nama_lengkap: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            attributes: ['id', 'nama_lengkap', 'level', 'username', 'pegawaiId'],
            include: [{
                model: Pegawai,
                attributes: ['nip', 'name']
            }],
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Users.findAll({
            where: {
                [Op.or]: [{
                    username: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    nama_lengkap: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            attributes: ['id', 'nama_lengkap', 'level', 'username', 'pegawaiId'],
            include: [{
                model: Pegawai
            }],
            offset: offset,
            limit: limit,
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json({
            result: result,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['id', 'nama_lengkap', 'level', 'username', 'pegawaiId'],
            where: {
                id: req.params.id
            },
            include: [{
                model: Pegawai,
                attributes: ['nip', 'name', 'foto', 'url', 'bidangId', 'pangkatId', 'golonganId', 'tempat_lahir', 'tanggal_lahir', 'umur', 'jabatan', 'nama_jabatan', 'jenis_kelamin', 'agama', 'jenis_pegawai', 'masa_kerja_golongan']
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
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan", status: "fail" });
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User dihapus", status: "ok" });
    } catch (error) {
        res.status(400).json({ msg: error.message, status: "fail" });
    }
}