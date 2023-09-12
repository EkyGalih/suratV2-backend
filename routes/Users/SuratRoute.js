import express from "express";
import {
    createSurat,
    deleteSurat,
    getAllSurat,
    getSurat,
    getSuratById,
    updateSurat
} from "../../controllers/Users/SuratController.js";
import { verifyUser, userOnly } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/user/surat', getAllSurat);
router.get('/user/surat/:bidangId', getSurat);
router.get('/user/surats/:id', getSuratById);
router.post('/user/surat', createSurat);
router.patch('/user/surat/:id', updateSurat);
router.delete('/user/surat/:id', deleteSurat);

export default router;