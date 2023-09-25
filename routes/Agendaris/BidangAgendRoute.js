import express from "express";
import {
    createBidang,
    deleteBidang,
    getBidang,
    getBidangById,
    updateBidang
} from "../../controllers/Agendaris/BidangAgendController.js";
import { adminOnly, verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/agendaris/bidang', getBidang);
router.get('/agendaris/bidang/:id', getBidangById);
router.post('/agendaris/bidang', createBidang);
router.patch('/agendaris/bidang/:id', updateBidang);
router.delete('/agendaris/bidang/:id', deleteBidang);

export default router;