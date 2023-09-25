import express from "express";
import {
    countSuratKeluar,
    countSuratMasuk,
    createSurat,
    deleteSurat,
    getSurat,
    getSuratById,
    getSuratKeluar,
    getSuratMasuk,
    updateSurat
} from "../../controllers/Agendaris/SuratAgendController.js";

const router = express.Router();

router.get('/agendaris/surat/keluar', getSuratKeluar);
router.get('/agendaris/surat/keluar/count', countSuratKeluar);
router.get('/agendaris/surat/masuk', getSuratMasuk);
router.get('/agendaris/surat/masuk/count', countSuratMasuk);
router.get('/agendaris/surat/:bidangId', getSurat);
router.get('/agendaris/surats/:id', getSuratById);
router.post('/agendaris/surat', createSurat);
router.patch('/agendaris/surat/:id', updateSurat);
router.delete('/agendaris/surat/:id', deleteSurat);

export default router;