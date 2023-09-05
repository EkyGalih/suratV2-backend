import express from "express";
import {
    createGolongan,
    deleteGolongan,
    getGolongan,
    getGolonganById,
    updateGolongan
} from "../../controllers/Admin/GolonganController.js";
import { adminOnly, verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/admin/golongan', verifyUser, adminOnly, getGolongan);
router.get('/admin/golongan/:id', verifyUser, adminOnly, getGolonganById);
router.post('/admin/golongan', verifyUser, adminOnly, createGolongan);
router.patch('/admin/golongan/:id', verifyUser, adminOnly, updateGolongan);
router.delete('/admin/golongan/:id', verifyUser, adminOnly, deleteGolongan);

export default router;