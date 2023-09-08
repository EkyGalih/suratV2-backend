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

router.get('/admin/pegawai', getPegawai);
router.get('/admin/pegawais', getAllPegawai);
router.get('/admin/pegawai/:id', getPegawaiById);
router.post('/admin/pegawai', verifyUser, createPegawai);
router.patch('/admin/pegawai/:id', verifyUser, updatePegawai);
router.delete('/admin/pegawai/:id', verifyUser, deletePegawai);

export default router;