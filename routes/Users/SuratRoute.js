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

router.get('/surat', verifyUser, getAllSurat);
router.get('/user/surat', verifyUser, userOnly, getSurat);
router.get('/user/surat/:id', verifyUser, userOnly, getSuratById);
router.post('/user/surat', verifyUser, userOnly, createSurat);
router.patch('/user/surat/:id', verifyUser, userOnly, updateSurat);
router.delete('/user/surat/:id', verifyUser, userOnly, deleteSurat);

export default router;