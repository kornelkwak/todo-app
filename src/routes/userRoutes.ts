import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { deleteUser, getUser, editUser } from "../controllers/userController";

const router = Router();

router.get("/user/:id", authMiddleware, getUser);
router.put("/user/:id", authMiddleware, editUser);
router.delete("/user/:id", authMiddleware, deleteUser);

export default router;
