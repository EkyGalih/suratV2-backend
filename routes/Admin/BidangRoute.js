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

router.get('/bidang', verifyUser, getBidang);
router.get('/bidang/:id', verifyUser, getBidangById);
router.post('/bidang', verifyUser, adminOnly, createBidang);
router.patch('/bidang/:id', verifyUser, adminOnly, updateBidang);
router.delete('/bidang/:id', verifyUser, adminOnly, deleteBidang);

export default router;