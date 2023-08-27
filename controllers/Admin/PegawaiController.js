import Bidang from "../../models/BidangModel.js";
import Golongan from "../../models/GolonganModel.js";
import Pangkat from "../../models/PangkatModel.js";
import Pegawai from "../../models/PegawaiModel.js";

export const getPegawai = async (req, res) => {
    try {
        const response = await Pegawai.findAll({
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
            order: [[
                'createdAt', 'DESC'
            ]]
        });
        res.status(200).json(response);
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
                attributes: ['id', 'nama_bidang']
            }, {
                model: Golongan,
                attributes: ['id', 'nama_golongan']
            }, {
                model: Pangkat,
                attributes: ['id', 'nama_pangkat']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const createPegawai = async (req, res) => {
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
        foto,
        url,
        pangkatId,
        golonganId,
        bidangId
    } = req.body;
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
            foto: foto,
            url: url,
            pangkatId: pangkatId,
            golonganId: golonganId,
            bidangId: bidangId
        });
        res.status(200).json({ msg: "Pegawai dibuat!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updatePegawai = async (req, res) => {
    const pegawai = Pegawai.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!pegawai) return res.status(404).json({ msg: "Pegawai tidak ditemukan!" });
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
        foto,
        url,
        pangkatId,
        golonganId,
        bidangId
    } = req.body;
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
            foto: foto,
            url: url,
            pangkatId: pangkatId,
            golonganId: golonganId,
            bidangId: bidangId
        }, {
            where: {
                id: pegawai.id
            }
        });
        res.status(200).json({ msg: "Pegawai dibuat!" });
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