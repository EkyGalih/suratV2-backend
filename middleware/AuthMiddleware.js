import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "mohon login ke akun anda" });
    }
    const user = await Users.findOne({
        where: {
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    req.userId = user.id;
    req.level = user.level;
    next();
}

export const adminOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    if (user.level !== 'admin') return res.status(404).json({ msg: "Akses terlarang!" });
    next();
}

export const userOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan!" });
    if (user.level !== 'user') return res.status(404).json({ msg: "Akses terlarang!" });
    next();
}

export const agendarisOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan!" });
    if (user.level !== 'agendaris') return res.status(404).json({ msg: "Akses terlarang!" });
    next();
}

export const pimpinanOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan!" });
    if (user.level !== 'pimpinan') return res.status(404).json({ msg: "Akses terlarang!" });
    next();
}