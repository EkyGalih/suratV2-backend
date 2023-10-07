import { Op } from "sequelize";
import Surat from "../../models/SuratModel.js";
import Bidang from "../../models/BidangModel.js";
import FileSurat from "../../models/FileSuratModel.js";

export const getSuratMasukNotif = async (req, res) => {
    try {
        const rows = await Surat.count({
            where: {
                jenis_surat: 'masuk',
                isi_disposisi: null
            }
        });
        const result = await Surat.findAll({
            where: {
                jenis_surat: 'masuk',
                isi_disposisi: null
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json({
            rows: rows,
            result: result
        });
    } catch (error) {
        res.status(500).json({ msg: error.message, status: 'fail' });
    }
}

export const getSuratKeluarNotif = async (req, res) => {
    try {
        const rows = await Surat.count({
            where: {
                jenis_surat: 'keluar',
                no_surat: null
            }
        });
        const result = await Surat.findAll({
            where: {
                jenis_surat: 'keluar',
                no_surat: null
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json({
            rows: rows,
            result: result
        });
    } catch (error) {
        res.status(500).json({ msg: error.message, status: 'fail' });
    }
}

export const getSuratMasuk = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Surat.count({
            where: {
                jenis_surat: 'masuk',
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
                jenis_surat: 'masuk',
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
        res.status(500).json({ msg: error.message, status: 'fail' });
    }
}

export const getSuratKeluar = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Surat.count({
            where: {
                jenis_surat: 'keluar',
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
                jenis_surat: 'keluar',
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
        res.status(500).json({ msg: error.message, status: 'fail' });
    }
}

export const getSuratById = async (req, res) => {
    try {
        const response = await FileSurat.findOne({
            where: {
                suratId: req.params.id
            },
            include: [{
                model: Surat
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message, status: 'fail' });
    }
}

export const updateSurat = async (req, res) => {
    const surat = await FileSurat.findOne({
        include: [{
            model: Surat
        }],
        where: {
            suratId: req.params.id
        }
    });

    if (!surat) return res.status(404).json({ msg: "Surat tidak ditemukan!", status: 'fail' });

    const { isi_disposisi } = req.body;

    try {
        await Surat.update({
            isi_disposisi: isi_disposisi,
            status_surat: 'read'
        }, {
            where: {
                id: surat.surat.id
            }
        });
        res.status(200).json({ msg: "Surat berhasil didisposisi!", status: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, status: 'fail' });
    }
}