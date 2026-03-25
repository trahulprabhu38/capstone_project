import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getProfile } from "../controllers/profile.controller";

const router = Router();

router.get("/", authMiddleware, getProfile);

export default router;
