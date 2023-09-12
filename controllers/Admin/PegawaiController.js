import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import Bidang from "../../models/BidangModel.js";
import Golongan from "../../models/GolonganModel.js";
import Pangkat from "../../models/PangkatModel.js";
import Pegawai from "../../models/PegawaiModel.js";

export const getAllPegawai = async (req, res) => {
    try {
        const response = await Pegawai.findAll({
            include: [{
                model: Bidang,
                attributes: ['nama_bidang']
            }, {
                model: Golongan,
                attributes: ['nama_golongan']
            }, {
                model: Pangkat,
                attributes: ['nama_pangkat']
            }],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getPegawaiAsn = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Pegawai.count({
            where: {
                jenis_pegawai: 'pns',
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    nip: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            include: [{
                model: Bidang,
                attributes: ['nama_bidang']
            }, {
                model: Golongan,
                attributes: ['nama_golongan']
            }, {
                model: Pangkat,
                attributes: ['nama_pangkat']
            }],
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Pegawai.findAll({
            where: {
                jenis_pegawai: 'pns',
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    nip: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    bidangId: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            include: [{
                model: Bidang,
                attributes: ['nama_bidang']
            }, {
                model: Golongan,
                attributes: ['nama_golongan']
            }, {
                model: Pangkat,
                attributes: ['nama_pangkat']
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
        console.log(error.message);
    }
}

export const getPegawaiNonAsn = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Pegawai.count({
            where: {
                jenis_pegawai: ['kontrak', 'p3k', 'ptt'],
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    nip: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            include: [{
                model: Bidang,
                attributes: ['nama_bidang']
            }],
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Pegawai.findAll({
            where: {
                jenis_pegawai: ['kontrak', 'p3k', 'ptt'],
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    nip: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            include: [{
                model: Bidang,
                attributes: ['nama_bidang']
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
        console.log(error.message);
    }
}


export const getPegawaiById = async (req, res) => {
    try {
        const response = await Pegawai.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Bidang,
                attributes: ['nama_bidang']
            }, {
                model: Golongan,
                attributes: ['nama_golongan']
            }, {
                model: Pangkat,
                attributes: ['nama_pangkat']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const createPegawai = async (req, res) => {
    if (req.files === null || req.files === '') return res.status(400).json({ msg: "No File Uploaded" });
    const {
        nip,
        jenis_pegawai,
        name,
        tempat_lahir,
        tanggal_lahir,
        nama_jabatan,
        jabatan,
        initial_jabatan,
        masa_kerja_golongan,
        diklat,
        pendidikan,
        no_sk,
        no_rekening,
        nama_rekening,
        umur,
        jenis_kelamin,
        agama,
        kenaikan_pangkat,
        batas_pensiun,
        pangkatId,
        golonganId,
        bidangId
    } = req.body;
   
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images", st: 'fail' });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB", st: 'fail' });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Pegawai.create({
                nip: nip,
                jenis_pegawai: jenis_pegawai,
                name: name,
                tempat_lahir: tempat_lahir,
                tanggal_lahir: tanggal_lahir,
                nama_jabatan: nama_jabatan,
                jabatan: jabatan,
                initial_jabatan: initial_jabatan,
                masa_kerja_golongan: masa_kerja_golongan,
                diklat: diklat,
                pendidikan: pendidikan,
                no_sk: no_sk,
                no_rekening: no_rekening,
                nama_rekening: nama_rekening,
                umur: umur,
                jenis_kelamin: jenis_kelamin,
                agama: agama,
                kenaikan_pangkat: kenaikan_pangkat,
                batas_pensiun: batas_pensiun,
                foto: fileName,
                url: url,
                pangkatId: pangkatId,
                golonganId: golonganId,
                bidangId: bidangId
            });
            res.status(200).json({ msg: "Pegawai dibuat!", st: 'ok' });
        } catch (error) {
            res.status(400).json({ msg: error.message, st: 'fail' });
        }
    });
}

export const updatePegawai = async (req, res) => {
    const peg = await Pegawai.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Bidang
        }, {
            model: Golongan
        }, {
            model: Pangkat
        }]
    });
    if (!peg) return res.status(404).json({ msg: "Pegawai tidak ditemukan!", st: 'fail' });

    let fileName = "";
    if (req.files === null) {
        fileName = peg.foto;
    } else {
        const file = req.files.foto;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', 'jpg', 'jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images", st: 'fail' });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB", st: 'fail' });

        const filepath = `./public/images/${peg.foto}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const {
        nip,
        jenis_pegawai,
        name,
        tempat_lahir,
        tanggal_lahir,
        nama_jabatan,
        jabatan,
        initial_jabatan,
        masa_kerja_golongan,
        diklat,
        pendidikan,
        no_sk,
        no_rekening,
        nama_rekening,
        umur,
        jenis_kelamin,
        agama,
        kenaikan_pangkat,
        batas_pensiun,
        pangkatId,
        golonganId,
        bidangId
    } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Pegawai.update({
            nip: nip,
            jenis_pegawai: jenis_pegawai,
            name: name,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            nama_jabatan: nama_jabatan,
            jabatan: jabatan,
            initial_jabatan: initial_jabatan,
            masa_kerja_golongan: masa_kerja_golongan,
            diklat: diklat,
            pendidikan: pendidikan,
            no_sk: no_sk,
            no_rekening: no_rekening,
            nama_rekening: nama_rekening,
            umur: umur,
            jenis_kelamin: jenis_kelamin,
            agama: agama,
            kenaikan_pangkat: kenaikan_pangkat,
            batas_pensiun: batas_pensiun,
            foto: fileName,
            url: url,
            pangkatId: pangkatId,
            golonganId: golonganId,
            bidangId: bidangId
        }, {
            where: {
                id: peg.id
            }
        });
        res.status(200).json({ msg: "Pegawai Diubah!", st: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, st: 'fail' });
    }
}

export const deletePegawai = async (req, res) => {
    const peg = await Pegawai.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!peg) return res.status(404).json({ msg: "Pegawai tidak ditemukan!", st: 'fail' });
    try {
        const filepath = `./public/images/${peg.foto}`;
        fs.unlinkSync(filepath);
        await Pegawai.destroy({
            where: {
                id: peg.id
            }
        });
        res.status(200).json({ msg: "Pegawai dihapus!", st: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, st: 'fail' });
    }
}