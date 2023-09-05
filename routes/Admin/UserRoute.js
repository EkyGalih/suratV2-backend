import express from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUserById,
    updateUser
} from "../../controllers/Admin/UserController.js";
import { adminOnly, verifyUser } from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/admin/users', getUser);
router.get('/admin/users/:id', getUserById);
router.post('/admin/users', createUser);
router.patch('/admin/users/:id', updateUser);
router.delete('/admin/users/:id', deleteUser);

export default router;