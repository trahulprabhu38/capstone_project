import { Router } from "express";
import { uploadDocument, getDocumentUrl } from "../controllers/upload.controller";
import { authMiddleware } from "../middleware/auth";
import { blockCheck } from "../middleware/blockCheck";
import { upload } from "../middleware/upload";
import { uploadRateLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post(
  "/document",
  authMiddleware,
  blockCheck,
  uploadRateLimiter,
  upload.single("file"),
  uploadDocument
);

router.get("/document/:key(*)", authMiddleware, getDocumentUrl);

export default router;
