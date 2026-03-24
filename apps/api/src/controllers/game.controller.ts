import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { findApplicationByUserId } from "../services/kyc.service";
import { env } from "../config/env";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { logger } from "../utils/logger";

export async function getGameUrl(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!._id.toString();
    const application = await findApplicationByUserId(userId);

    if (!application || application.status !== "APPROVED") {
      sendError(res, "Access denied. Your KYC must be approved to play.", 403);
      return;
    }

    sendSuccess(res, { url: env.GAME_WEBGL_URL }, "Game URL retrieved");
  } catch (error) {
    logger.error("Get game URL error:", error);
    sendError(res, "Failed to get game URL", 500);
  }
}
