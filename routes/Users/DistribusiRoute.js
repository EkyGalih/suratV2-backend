import express from "express";
import {
    createDistribusi,
    deleteDistribusi,
    getDistribusi,
    getDistribusiByBidangId,
    getDistribusiById
} from "../../controllers/Users/DistribusiController.js";
import { verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/distribusi', getDistribusi);
router.get('/distribusi/:bidangId', getDistribusiByBidangId);
router.get('/distribusi/:id', getDistribusiById);
router.post('/distribusi', createDistribusi);
router.delete('/distribusi/:id', deleteDistribusi);

export default router;