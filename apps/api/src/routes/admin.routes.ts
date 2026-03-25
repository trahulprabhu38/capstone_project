import { Router } from "express";
import {
  listApplications,
  getApplicationDetail,
  reviewApplication,
  listUsers,
  blockUser,
  unblockUser,
  getStats,
  getConfig,
  updateConfig,
} from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth";
import { adminAuthMiddleware } from "../middleware/adminAuth";

const router = Router();

router.use(authMiddleware, adminAuthMiddleware);

router.get("/applications", listApplications);
router.get("/applications/:id", getApplicationDetail);
router.patch("/applications/:id", reviewApplication);
router.get("/users", listUsers);
router.patch("/users/:id/block", blockUser);
router.patch("/users/:id/unblock", unblockUser);
router.get("/stats", getStats);
router.get("/config", getConfig);
router.put("/config", updateConfig);

export default router;
