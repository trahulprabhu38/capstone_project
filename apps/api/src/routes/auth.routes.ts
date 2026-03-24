import { Router } from "express";
import { signup, login, getMe, refreshToken } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth";
import { authRateLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/signup", authRateLimiter, signup);
router.post("/login", authRateLimiter, login);
router.get("/me", authMiddleware, getMe);
router.post("/refresh", refreshToken);

export default router;
