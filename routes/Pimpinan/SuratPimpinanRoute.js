import express from 'express';
import {
    getSuratById,
    getSuratKeluar,
    getSuratKeluarNotif,
    getSuratMasuk,
    getSuratMasukNotif,
    updateSurat
} from "../../controllers/Pimpinan/SuratPimpinanController.js";

const router = express.Router();

router.get('/pimpinan/surat/masuk/notif', getSuratMasukNotif);
router.get('/pimpinan/surat/keluar/notif', getSuratKeluarNotif);
router.get('/pimpinan/surat/masuk', getSuratMasuk);
router.get('/pimpinan/surat/keluar', getSuratKeluar);
router.get('/pimpinan/surat/keluar/:id', getSuratById);
router.patch('/pimpinan/surat/:id', updateSurat);

export default router;