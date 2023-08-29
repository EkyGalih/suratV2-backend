import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import Bidang from "../../models/BidangModel.js";
import Golongan from "../../models/GolonganModel.js";
import Pangkat from "../../models/PangkatModel.js";
import Pegawai from "../../models/PegawaiModel.js";

export const getPegawai = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Pegawai.count({
            where: {
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
                attributes: ['id', 'nama_bidang']
            }, {
                model: Golongan,
                attributes: ['id', 'nama_golongan']
            }, {
                model: Pangkat,
                attributes: ['id', 'nama_pangkat']
            }],
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Pegawai.findAll({
            where: {
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
                attributes: ['id', 'nama_bidang']
            }, {
                model: Golongan,
                attributes: ['id', 'nama_golongan']
            }, {
                model: Pangkat,
                attributes: ['id', 'nama_pangkat']
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
                model: Bidang
            }, {
                model: Golongan
            }, {
                model: Pangkat
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const createPegawai = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
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
    const allowedType = ['.png', 'jpg', 'jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

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
            res.status(200).json({ msg: "Pegawai dibuat!" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    });
}

export const updatePegawai = async (req, res) => {
    const pegawai = Pegawai.findOne({
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
    if (!pegawai) return res.status(404).json({ msg: "Pegawai tidak ditemukan!" });

    let fileName = "";
    if (req.files === null) {
        fileName = pegawai.foto;
    } else {
        console.log(pegawai);
        const file = req.files.foto;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', 'jpg', 'jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

        const filepath = `./public/images/${pegawai.foto}`;
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
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Pegawai Diubah!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deletePegawai = async (req, res) => {
    const pegawai = await Pegawai.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!pegawai) return res.status(404).json({ msg: "Pegawai tidak ditemukan!" });
    try {
        const filepath = `./public/images/${pegawai.foto}`;
        fs.unlinkSync(filepath);
        await Pegawai.destroy({
            where: {
                id: pegawai.id
            }
        });
        res.status(200).json({ msg: "Pegawai dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}