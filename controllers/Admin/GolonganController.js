import Golongan from "../../models/GolonganModel.js";

export const getGolongan = async (req, res) => {
    try {
        const response = await Golongan.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getGolonganById = async (req, res) => {
    try {
        const response = await Golongan.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createGolongan = async (req, res) => {
    const { nama_golongan } = req.body;
    try {
        await Golongan.create({ nama_golongan: nama_golongan });
        res.status(200).json({ msg: 'Golongan dibuat!', st: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, st: 'fail' });
    }
}

export const updateGolongan = async (req, res) => {
    const golongan = await Golongan.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!golongan) return res.status(404).json({ msg: "Golongan tidak ditemukan!", st: 'fail' });
    const { nama_golongan } = req.body;
    try {
        await Golongan.update({
            nama_golongan: nama_golongan
        }, {
            where: {
                id: golongan.id
            }
        });
        res.status(200).json({ msg: "Golongan di perbaharui!", st: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, st: 'fail' });
    }
}

export const deleteGolongan = async (req, res) => {
    const golongan = await Golongan.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!golongan) return res.status(404).json({ msg: "Golongan tidak ditemukan!", st: 'fail' });
    try {
        await Golongan.destroy({
            where: {
                id: golongan.id
            }
        });
        res.status(200).json({ msg: "Golongan dihapus!", st: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, st: 'fail' });
    }
}