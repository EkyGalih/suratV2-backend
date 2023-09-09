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

router.get('/admin/golongan', getGolongan);
router.get('/admin/golongan/:id', getGolonganById);
router.post('/admin/golongan', createGolongan);
router.patch('/admin/golongan/:id', updateGolongan);
router.delete('/admin/golongan/:id', deleteGolongan);

export default router;