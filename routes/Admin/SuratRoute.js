import express from "express";
import {
    createSurat,
    deleteSurat,
    getSurat,
    getSuratById,
    updateSurat
} from "../../controllers/Admin/SuratController.js";
import { verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/surat', verifyUser, getSurat);
router.get('/surat/:id', verifyUser, getSuratById);
router.post('/surat', verifyUser, createSurat);
router.patch('/surat/:id', verifyUser, updateSurat);
router.delete('/surat/:id', verifyUser, deleteSurat);

export default router;