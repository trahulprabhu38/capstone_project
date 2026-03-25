import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { KycApplicationModel } from "../models/KycApplication";
import { getPresignedUrl } from "../services/s3.service";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { logger } from "../utils/logger";

export async function getProfile(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const user = req.user!;

    const application = await KycApplicationModel.findOne({
      userId: user._id,
    }).lean();

    let documents: {
      type: string;
      url: string;
      uploadedAt: Date;
    }[] = [];

    if (application?.documents?.length) {
      documents = await Promise.all(
        application.documents.map(async (doc) => ({
          type: doc.type,
          url: await getPresignedUrl(doc.s3Key),
          uploadedAt: doc.uploadedAt,
        }))
      );
    }

    sendSuccess(res, {
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName || null,
        role: user.role,
        createdAt: user.createdAt,
      },
      kyc: application
        ? {
            status: application.status,
            personalInfo: application.personalInfo || null,
            walletAddress: application.walletAddress || null,
            submittedAt: application.submittedAt || null,
            reviewedAt: application.reviewedAt || null,
            adminRemarks: application.adminRemarks || null,
          }
        : null,
      documents,
    });
  } catch (error) {
    logger.error("Get profile error:", error);
    sendError(res, "Failed to fetch profile", 500);
  }
}
