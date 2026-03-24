import { Response } from "express";
import { kycSubmitSchema } from "@kyc-platform/shared";
import { AuthRequest } from "../middleware/auth";
import {
  createOrUpdateApplication,
  findApplicationByUserId,
} from "../services/kyc.service";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { logger } from "../utils/logger";

export async function submitKyc(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const parsed = kycSubmitSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, parsed.error.errors[0].message);
      return;
    }

    const userId = req.user!._id.toString();
    const application = await createOrUpdateApplication(userId, parsed.data);

    sendSuccess(res, application, "KYC application submitted", 201);
  } catch (error) {
    logger.error("KYC submit error:", error);
    sendError(res, "Failed to submit KYC application", 500);
  }
}

export async function getKycStatus(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!._id.toString();
    const application = await findApplicationByUserId(userId);

    if (!application) {
      sendSuccess(res, { status: "NOT_STARTED" }, "No application found");
      return;
    }

    sendSuccess(res, application);
  } catch (error) {
    logger.error("KYC status error:", error);
    sendError(res, "Failed to get KYC status", 500);
  }
}

export async function updateKyc(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const parsed = kycSubmitSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, parsed.error.errors[0].message);
      return;
    }

    const userId = req.user!._id.toString();
    const existing = await findApplicationByUserId(userId);

    if (existing && !["NOT_STARTED", "REJECTED"].includes(existing.status)) {
      sendError(res, "Cannot update application in current status");
      return;
    }

    const application = await createOrUpdateApplication(userId, parsed.data);
    sendSuccess(res, application, "KYC application updated");
  } catch (error) {
    logger.error("KYC update error:", error);
    sendError(res, "Failed to update KYC application", 500);
  }
}
