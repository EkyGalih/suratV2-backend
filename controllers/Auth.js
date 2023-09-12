import Pegawai from "../models/PegawaiModel.js";
import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            username: req.body.username
        }
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan", status: 404 });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Password salah", status: 400 });
    req.session.userId = user.id;
    const id = user.id;
    const nama_lengkap = user.nama_lengkap;
    const username = user.username;
    const level = user.level;
    const foto = user.foto;
    res.status(200).json({ id, nama_lengkap, username, level, foto, status: 200 });
}

export const Me = async (req, res) => {
    console.log(req.params.id);
    if (!req.params.id) {
        return res.status(401).json({ msg: "mohon login ke akun anda" });
    }
    const user = await Users.findOne({
        attributes: ['id', 'nama_lengkap', 'username', 'level'],
        where: {
            id: req.params.id
        },
        include: [{
            model: Pegawai,
            attributes: ['url', 'name', 'bidangId']
        }]
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    res.status(200).json(user);
}

export const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "tidak bisa logout" });
        res.status(200).json({ msg: "anda berhasil keluar" });
    })
}