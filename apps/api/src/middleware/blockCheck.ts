import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
import { sendError } from "../utils/apiResponse";

/**
 * Rejects requests from blocked users with a 403 and the block reason.
 * Must be used after authMiddleware so req.user is populated.
 */
export function blockCheck(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  if (req.user?.isBlocked) {
    sendError(
      res,
      req.user.blockReason || "Your account has been blocked.",
      403
    );
    return;
  }
  next();
}
