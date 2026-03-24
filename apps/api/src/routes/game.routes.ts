import { Router } from "express";
import { getGameUrl } from "../controllers/game.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/url", authMiddleware, getGameUrl);

export default router;
