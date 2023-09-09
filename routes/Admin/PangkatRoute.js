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

router.get('/admin/pangkat', getPangkat);
router.get('/admin/pangkat/:id', getPangkatById);
router.post('/admin/pangkat', createPangkat);
router.patch('/admin/pangkat/:id', updatePangkat);
router.delete('/admin/pangkat/:id', deletePangkat);

export default router;