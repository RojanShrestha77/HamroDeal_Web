import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

const authController = new AuthController();

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);



export default router;
