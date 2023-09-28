import express from "express";
import { distSuratMasuk, getDistribusiBySuratId } from "../../controllers/Agendaris/DistribusiAgendController.js";

const router = express.Router();

router.patch('/agendaris/distribusi/:suratId', distSuratMasuk);
router.get('/agendaris/distribusi/:suratId', getDistribusiBySuratId);

export default router;