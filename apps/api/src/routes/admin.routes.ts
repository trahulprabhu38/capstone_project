import { Router } from "express";
import {
  listApplications,
  getApplicationDetail,
  reviewApplication,
  listUsers,
  getStats,
} from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth";
import { adminAuthMiddleware } from "../middleware/adminAuth";

const router = Router();

router.use(authMiddleware, adminAuthMiddleware);

router.get("/applications", listApplications);
router.get("/applications/:id", getApplicationDetail);
router.patch("/applications/:id", reviewApplication);
router.get("/users", listUsers);
router.get("/stats", getStats);

export default router;
