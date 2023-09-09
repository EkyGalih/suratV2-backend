import express from "express";
import {
    getPegawaiById,
    createPegawai,
    updatePegawai,
    deletePegawai,
    getAllPegawai,
    getPegawaiAsn,
    getPegawaiNonAsn
} from "../../controllers/Admin/PegawaiController.js";
import { verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/admin/pegawai/asn', getPegawaiAsn);
router.get('/admin/pegawai/nonasn', getPegawaiNonAsn);
router.get('/admin/pegawais', getAllPegawai);
router.get('/admin/pegawai/:id', getPegawaiById);
router.post('/admin/pegawai', createPegawai);
router.patch('/admin/pegawai/:id', updatePegawai);
router.delete('/admin/pegawai/:id', deletePegawai);

export default router;