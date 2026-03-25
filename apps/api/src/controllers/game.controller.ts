import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { findApplicationByUserId } from "../services/kyc.service";
import { getConfigValue } from "../models/Config";
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

    const url = await getConfigValue("GAME_WEBGL_URL", "");

    if (!url) {
      sendError(res, "Game URL has not been configured yet.", 503);
      return;
    }

    sendSuccess(res, { url }, "Game URL retrieved");
  } catch (error) {
    logger.error("Get game URL error:", error);
    sendError(res, "Failed to get game URL", 500);
  }
}
