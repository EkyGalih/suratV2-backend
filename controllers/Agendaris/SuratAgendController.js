import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import { v4 as UUIDV4 } from 'uuid';
import Bidang from "../../models/BidangModel.js";
import Surat from "../../models/SuratModel.js";
import FileSurat from "../../models/FileSuratModel.js";

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
        res.status(500).json({ msg: error.message });
    }
}

export const countSuratKeluar = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Surat.count({
            where: {
                jenis_surat: 'keluar',
                no_surat: null,
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
                no_surat: null,
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

export const countSuratMasuk = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Surat.count({
            where: {
                jenis_surat: 'masuk',
                isi_disposisi: null,
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
                isi_disposisi: null,
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

export const getSurat = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Surat.count({
            where: {
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
        res.status(500).json({ msg: error.message });
    }
}

export const createSurat = async (req, res) => {
    if (req.files === null || req.files === '') return res.status(400).json({ msg: "No File Uploaded", status: 'fail' });
    const {
        jenis_surat,
        kategori,
        tgl_terima,
        asal_surat,
        tgl_surat,
        no_surat,
        perihal,
        diteruskan,
        isi_disposisi,
        status_surat,
        bidangId,
        lampiran
    } = req.body;

    const uuid = UUIDV4();
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "invalid File", status: 'fail' });
    if (fileSize > 5000000) return res.status(422).json({ msg: "File must be less than 5MB", status: 'fail' });

    if (jenis_surat === 'keluar') {
        const url = `${req.protocol}://${req.get("host")}/surat/SuratKeluar/${fileName}`;
        file.mv(`public/surat/SuratKeluar/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message, status: 'fail' });
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
                    file: fileName,
                    path_file: url,
                    lampiran: lampiran,
                    path_lampiran: lampiran,
                    suratId: uuid
                });
                res.status(200).json({ msg: "Surat berhasil dibuat!", status: 'ok' });
            } catch (error) {
                res.status(400).json({ msg: error.message, status: 'fail' });
            }
        })
    } else if (jenis_surat === 'masuk') {
        const url = `${req.protocol}://${req.get("host")}/surat/SuratMasuk/${fileName}`;
        file.mv(`public/surat/SuratMasuk/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message, status: 'fail' });
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
                    path_file: url,
                    lampiran: lampiran,
                    path_lampiran: lampiran,
                    suratId: uuid
                });
                res.status(200).json({ msg: "Surat berhasil dibuat!", status: 'ok' });
            } catch (error) {
                res.status(400).json({ msg: error.message, status: 'fail' });
            }
        })

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

    let fileName = "";
    if (req.files === null) {
        fileName = surat.file;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "invalid File", status: 'fail' });
        if (fileSize > 5000000) return res.status(422).json({ msg: "File must be less than 5MB", status: 'fail' });

        if (surat.surat.jenis_surat === 'keluar') {
            const filepath = `./public/surat/SuratKeluar/${surat.file}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/surat/SuratKeluar/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message, status: 'fail' });
            });
        } else if (surat.surat.jenis_surat === 'masuk') {
            const filepath = `./public/surat/SuratMasuk/${surat.file}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/surat/SuratMasuk/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message, status: 'fail' });
            });
        }
    }

    const {
        jenis_surat,
        kategori,
        tgl_terima,
        asal_surat,
        tgl_surat,
        no_surat,
        perihal,
        diteruskan,
        isi_disposisi,
        bidangId,
        lampiran
    } = req.body;

    if (jenis_surat === 'keluar') {
        const url = `${req.protocol}://${req.get("host")}/surat/SuratKeluar/${fileName}`;
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
                status_surat: 'unread',
                bidangId: bidangId
            }, {
                where: {
                    id: surat.surat.id
                }
            });
            await FileSurat.update({
                file: fileName,
                path_file: url,
                lampiran: lampiran,
                path_lampiran: lampiran,
            }, {
                where: {
                    suratId: surat.surat.id
                }
            });
            res.status(200).json({ msg: "Surat berhasil di perbaharui!", status: 'ok' });
        } catch (error) {
            res.status(400).json({ msg: error.message, status: 'fail' });
        }
    } else if (jenis_surat === 'masuk') {
        const url = `${req.protocol}://${req.get("host")}/surat/SuratMasuk/${fileName}`;
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
                file: fileName,
                path_file: url,
                lampiran: lampiran,
                path_lampiran: lampiran,
            }, {
                where: {
                    suratId: surat.id
                }
            });
            res.status(200).json({ msg: "Surat berhasil di perbaharui!", status: 'ok' });
        } catch (error) {
            res.status(400).json({ msg: error.message, status: 'faile' });
        }
    }

}

export const deleteSurat = async (req, res) => {
    const response = await FileSurat.findOne({
        where: {
            suratId: req.params.id
        },
        include: [{
            model: Surat
        }]
    });
    if (!response) return res.status(404).json({ msg: "Surat tidak ditemukan!", status: 'fail' });

    try {
        if (response.surat.jenis_surat === 'keluar') {
            const filepath = `./public/surat/SuratKeluar/${response.file}`;
            fs.unlinkSync(filepath);
        } else if (response.surat.jenis_surat === 'masuk') {
            const filepath = `./public/surat/SuratMasuk/${response.file}`;
            fs.unlinkSync(filepath);
        }

        await Surat.destroy({
            where: {
                id: response.surat.id
            }
        });
        await FileSurat.destroy({
            where: {
                suratId: response.surat.id
            }
        });
        res.status(200).json({ msg: "Surat berhasil dihapus!", status: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, status: 'faile' });
    }
}