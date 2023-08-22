import express from "express";
import {
    createDistribusi,
    deleteDistribusi,
    getDistribusi,
    getDistribusiById
} from "../../controllers/Admin/DistribusiController.js";
import { verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/distribusi', verifyUser, getDistribusi);
router.get('/distribusi/:id', verifyUser, getDistribusiById);
router.post('/distribusi', verifyUser, createDistribusi);
router.delete('/distribusi/:id', verifyUser, deleteDistribusi);

export default router;