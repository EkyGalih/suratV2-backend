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

router.get('/admin/bidang', getBidang);
router.get('/admin/bidang/:id', getBidangById);
router.post('/admin/bidang', createBidang);
router.patch('/admin/bidang/:id', updateBidang);
router.delete('/admin/bidang/:id', deleteBidang);

export default router;