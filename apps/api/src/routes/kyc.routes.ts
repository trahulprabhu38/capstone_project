import { Router } from "express";
import { submitKyc, getKycStatus, updateKyc } from "../controllers/kyc.controller";
import { authMiddleware } from "../middleware/auth";
import { blockCheck } from "../middleware/blockCheck";

const router = Router();

router.post("/submit", authMiddleware, blockCheck, submitKyc);
router.get("/status", authMiddleware, getKycStatus);
router.put("/update", authMiddleware, blockCheck, updateKyc);

export default router;
