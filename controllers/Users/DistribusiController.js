import Distribusi from "../../models/DistribusiModel.js";
import Bidang from "../../models/BidangModel.js";
import Surat from "../../models/SuratModel.js";

export const getDistribusi = async (req, res) => {
    try {
        const response = await Distribusi.findAll({
            include: [{
                model: Bidang,
                attributes: ['nama_bidang']
            }, {
                model: Surat
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getDistribusiById = async (req, res) => {
    try {
        const response = await Distribusi.findOne({
            where: {
                id: req.params.id,
            },
            include: [{
                model: Bidang,
                attributes: ['nama_bidang']
            }, {
                model: Surat
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createDistribusi = async (req, res) => {
    const { bidangId, suratId } = req.body;
    try {
        await Distribusi.create({
            bidangId: bidangId,
            suratId: suratId,
            status_baca: 'unread'
        });
        res.status(201).json({ msg: "Surat berhasil didistribusi!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteDistribusi = async (req, res) => {
    const distribusi = await Distribusi.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!distribusi) return res.status(404).json({ msg: "Distribusi tidak ditemukan!" });
    try {
        await Distribusi.destroy({
            where: {
                id: distribusi.id
            }
        });
        res.status(200).json({ msg: "Tujuan Distribusi dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}