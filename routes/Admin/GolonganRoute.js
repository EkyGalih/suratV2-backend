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

router.get('/golongan', verifyUser, adminOnly, getGolongan);
router.get('/golongan/:id', verifyUser, adminOnly, getGolonganById);
router.post('/golongan', verifyUser, adminOnly, createGolongan);
router.patch('/golongan/:id', verifyUser, adminOnly, updateGolongan);
router.delete('/golongan/:id', verifyUser, adminOnly, deleteGolongan);

export default router;