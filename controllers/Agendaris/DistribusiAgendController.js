import Distribusi from "../../models/DistribusiModel.js";
import Surat from "../../models/SuratModel.js";

export const distSuratMasuk = async (req, res) => {
    const surat = await Surat.findOne({
        where: {
            id: req.params.suratId
        }
    });
    if (!surat) return res.status(404).json({ msg: "Surat tidak ditemukan!", status: 'fail' });
    
    const dist = await Distribusi.findAll({
        where: {
            suratId: surat.id
        }
    });
    if (!dist) res.status(404).json({ msg: "Surat belum di distribusikan!", status: 'fail' });

    const { distribusi, diteruskan } = req.body;
    var arrayDist = distribusi.split(",");

    try {
        await Distribusi.destroy({
            where: {
                suratId: surat.id
            }
        });
        
        await arrayDist.forEach(value => {
            Distribusi.create({
                suratId: req.params.suratId,
                bidangId: value,
                status_baca: 'unread'
            });
        });

        await Surat.update({
            diteruskan: diteruskan,
            status_surat: 'done'
        }, {
            where: {
                id: surat.id
            }
        })
        res.status(200).json({ msg: 'Surat berhasil di distribusi', status: 'ok' });
    } catch (error) {
        res.status(400).json({ msg: error.message, status: 'fail' });
    }
}

export const getDistribusiBySuratId = async (req, res) => {
    const distribusi = await Distribusi.findAll({
        where: {
            suratId: req.params.suratId
        },
        order: [
            ['bidangId', 'ASC']
        ]
    });

    if (!distribusi) return res.status(404).json({ msg: "Surat belum di distribusi!", status: 'faile' });

    try {
        res.status(200).json(distribusi);
    } catch (error) {
        res.status(500).json({ msg: error.message, status: 'fail' });
    }
}