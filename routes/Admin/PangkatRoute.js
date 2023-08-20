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

router.get('/pangkat', verifyUser, adminOnly, getPangkat);
router.get('/pangkat/:id', verifyUser, adminOnly, getPangkatById);
router.post('/pangkat', verifyUser, adminOnly, createPangkat);
router.patch('/pangkat/:id', verifyUser, adminOnly, updatePangkat);
router.delete('/pangkat/:id', verifyUser, adminOnly, deletePangkat);

export default router;