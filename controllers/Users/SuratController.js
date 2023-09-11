import { Op } from "sequelize";
import {v4 as UUIDV4} from 'uuid';
import Bidang from "../../models/BidangModel.js";
import Surat from "../../models/SuratModel.js";
import FileSurat from "../../models/FileSuratModel.js";

export const getAllSurat = async (req, res) => {
    try {
        const response = await Surat.findAll({
            include: [{
                model: Bidang,
                attributes: ['id', 'nama_bidang']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getSurat = async (req, res) => {
    try {
        const page = parseInt(req.query.age) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Surat.count({
            where: {
                bidangId: req.params.bidangId,
                [Op.or]: [{
                    no_surat: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    asal_surat: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    perihal: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            include: [{
                model: Bidang,
                attributes: ['id', 'nama_bidang']
            }, {
                model: FileSurat,
                attributes: ['file', 'path_file', 'lampiran', 'path_lampiran']
            }]
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Surat.findAll({
            where: {
                bidangId: req.params.bidangId,
                [Op.or]: [{
                    no_surat: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    asal_surat: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    perihal: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            include: [{
                model: Bidang,
                attributes: ['id', 'nama_bidang']
            }, {
                model: FileSurat,
                attributes: ['file', 'path_file', 'lampiran', 'path_lampiran']
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

export const getSuratById = async (req, res) => {
    try {
        const response = await Surat.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: Bidang,
                attributes: ['id', 'nama_bidang']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createSurat = async (req, res) => {
    const {
        jenis_surat, kategori, tgl_terima, asal_surat, tgl_surat, no_surat, perihal, diteruskan, isi_disposisi, status_surat, bidangId, file, lampiran
    } = req.body;
    const uuid = UUIDV4();
    try {
        await Surat.create({
            id: uuid,
            jenis_surat: jenis_surat,
            kategori: kategori,
            tgl_terima: tgl_terima,
            asal_surat: asal_surat,
            tgl_surat: tgl_surat,
            no_surat: no_surat,
            perihal: perihal,
            diteruskan: diteruskan,
            isi_disposisi: isi_disposisi,
            status_surat: status_surat,
            bidangId: bidangId
        });
        await FileSurat.create({
            file: file,
            path_file: file,
            lampiran: lampiran,
            path_lampiran: lampiran,
            suratId: uuid
        });
        res.status(200).json({ msg: "Surat berhasil dibuat!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateSurat = async (req, res) => {
    const surat = await Surat.findOne({
        include: [{
            model: FileSurat
        }],
        where: {
            id: req.params.id
        }
    });
    if (!surat) return res.status(404).json({ msg: "Surat tidak ditemukan!" });
    const {
        jenis_surat, kategori, tgl_terima, asal_surat, tgl_surat, no_surat, perihal, diteruskan, isi_disposisi, status_surat, bidangId, file, lampiran
    } = req.body;
    try {
        await Surat.update({
            jenis_surat: jenis_surat,
            kategori: kategori,
            tgl_terima: tgl_terima,
            asal_surat: asal_surat,
            tgl_surat: tgl_surat,
            no_surat: no_surat,
            perihal: perihal,
            diteruskan: diteruskan,
            isi_disposisi: isi_disposisi,
            status_surat: status_surat,
            bidangId: bidangId
        }, {
            where: {
                id: surat.id
            }
        });
        await FileSurat.update({
            file: file,
            path_file: file,
            lampiran: lampiran,
            path_lampiran: lampiran,
        }, {
            where: {
                suratId: surat.id
            }
        });
        res.status(200).json({ msg: "Surat berhasil di perbaharui!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteSurat = async (req, res) => {
    const surat = Surat.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!surat) return res.status(404).json({ msg: "Surat tidak ditemukan!" });
    const filesurat = FileSurat.findOne({
        where: {
            suraId: surat.id
        }
    });
    if (!filesurat) return res.status(404).json({ msg: "File surat tidak ditemukan!" });
    try {
        await Surat.destroy({
            where: {
                id: surat.id
            }
        });
        await FileSurat.destroy({
            where: {
                suratId: surat.id
            }
        });
        res.status(200).json({ msg: "Surat berhasil dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}