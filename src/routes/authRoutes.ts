import { Router } from "express";
import { userLogin, userRegister} from "../controllers/authController";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
