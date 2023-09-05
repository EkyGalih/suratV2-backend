import express from "express";
import {
    createBidang,
    deleteBidang,
    getBidang,
    getBidangById,
    updateBidang
} from "../../controllers/Admin/BidangController.js";
import { adminOnly, verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/admin/bidang', verifyUser, getBidang);
router.get('/admin/bidang/:id', verifyUser, getBidangById);
router.post('/admin/bidang', verifyUser, adminOnly, createBidang);
router.patch('/admin/bidang/:id', verifyUser, adminOnly, updateBidang);
router.delete('/admin/bidang/:id', verifyUser, adminOnly, deleteBidang);

export default router;