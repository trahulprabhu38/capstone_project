import { Response } from "express";
import { adminReviewSchema, type KycStatus } from "@kyc-platform/shared";
import { AuthRequest } from "../middleware/auth";
import {
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  getDashboardStats,
} from "../services/kyc.service";
import { UserModel } from "../models/User";
import { sendStatusNotification } from "../services/email.service";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { logger } from "../utils/logger";

export async function listApplications(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const { status, search, page = "1", limit = "20" } = req.query;

    const result = await getAllApplications(
      status as KycStatus | undefined,
      search as string | undefined,
      parseInt(page as string, 10),
      parseInt(limit as string, 10)
    );

    sendSuccess(res, result);
  } catch (error) {
    logger.error("List applications error:", error);
    sendError(res, "Failed to list applications", 500);
  }
}

export async function getApplicationDetail(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id as string;
    const application = await getApplicationById(id);

    if (!application) {
      sendError(res, "Application not found", 404);
      return;
    }

    sendSuccess(res, application);
  } catch (error) {
    logger.error("Get application detail error:", error);
    sendError(res, "Failed to get application", 500);
  }
}

export async function reviewApplication(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const parsed = adminReviewSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, parsed.error.errors[0].message);
      return;
    }

    const id = req.params.id as string;
    const { status, adminRemarks } = parsed.data;
    const adminId = req.user!._id.toString();

    const application = await updateApplicationStatus(
      id,
      status,
      adminId,
      adminRemarks
    );

    if (!application) {
      sendError(res, "Application not found", 404);
      return;
    }

    const user = await UserModel.findById(application.userId);
    if (user) {
      await sendStatusNotification(
        user.email,
        status as "APPROVED" | "REJECTED",
        adminRemarks
      );
    }

    sendSuccess(res, application, `Application ${status.toLowerCase()}`);
  } catch (error) {
    logger.error("Review application error:", error);
    sendError(res, "Failed to review application", 500);
  }
}

export async function listUsers(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const users = await UserModel.find()
      .select("-password")
      .sort({ createdAt: -1 });

    sendSuccess(res, users);
  } catch (error) {
    logger.error("List users error:", error);
    sendError(res, "Failed to list users", 500);
  }
}

export async function getStats(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const stats = await getDashboardStats();
    const totalUsers = await UserModel.countDocuments();

    sendSuccess(res, { ...stats, totalUsers });
  } catch (error) {
    logger.error("Get stats error:", error);
    sendError(res, "Failed to get stats", 500);
  }
}
