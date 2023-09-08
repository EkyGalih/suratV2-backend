import express from "express";
import {
    createPangkat,
    deletePangkat,
    getPangkat,
    getPangkatById,
    updatePangkat
} from "../../controllers/Admin/PangkatController.js";
import { adminOnly, verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/admin/pangkat', verifyUser, adminOnly, getPangkat);
router.get('/admin/pangkat/:id', verifyUser, adminOnly, getPangkatById);
router.post('/admin/pangkat', verifyUser, adminOnly, createPangkat);
router.patch('/admin/pangkat/:id', verifyUser, adminOnly, updatePangkat);
router.delete('/admin/pangkat/:id', verifyUser, adminOnly, deletePangkat);

export default router;