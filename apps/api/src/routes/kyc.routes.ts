import { Router } from "express";
import { submitKyc, getKycStatus, updateKyc } from "../controllers/kyc.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/submit", authMiddleware, submitKyc);
router.get("/status", authMiddleware, getKycStatus);
router.put("/update", authMiddleware, updateKyc);

export default router;
