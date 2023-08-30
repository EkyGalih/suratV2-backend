import express from "express";
import {
    getPegawai,
    getPegawaiById,
    createPegawai,
    updatePegawai,
    deletePegawai,
    getAllPegawai
} from "../../controllers/Admin/PegawaiController.js";
import { verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/pegawai', verifyUser, getPegawai);
router.get('/pegawais', verifyUser, getAllPegawai);
router.get('/pegawai/:id', verifyUser, getPegawaiById);
router.post('/pegawai', verifyUser, createPegawai);
router.patch('/pegawai/:id', verifyUser, updatePegawai);
router.delete('/pegawai/:id', verifyUser, deletePegawai);

export default router;