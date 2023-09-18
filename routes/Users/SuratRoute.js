import express from "express";
import {
    createSurat,
    deleteSurat,
    getSurat,
    getSuratById,
    getSuratKeluar,
    getSuratMasuk,
    updateSurat
} from "../../controllers/Users/SuratController.js";
import { verifyUser, userOnly } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/user/surat/keluar', getSuratKeluar);
router.get('/user/surat/masuk', getSuratMasuk);
router.get('/user/surat/:bidangId', getSurat);
router.get('/user/surats/:id', getSuratById);
router.post('/user/surat', createSurat);
router.patch('/user/surat/:id', updateSurat);
router.delete('/user/surat/:id', deleteSurat);

export default router;