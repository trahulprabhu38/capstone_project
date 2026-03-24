import { Response } from "express";
import { documentTypeSchema } from "@kyc-platform/shared";
import { AuthRequest } from "../middleware/auth";
import { uploadToS3, getPresignedUrl } from "../services/s3.service";
import { addDocumentToApplication, findApplicationByUserId } from "../services/kyc.service";
import { KycApplicationModel } from "../models/KycApplication";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { logger } from "../utils/logger";

export async function uploadDocument(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const file = req.file;
    if (!file) {
      sendError(res, "No file uploaded");
      return;
    }

    const docTypeParsed = documentTypeSchema.safeParse(req.body.documentType);
    if (!docTypeParsed.success) {
      sendError(res, "Invalid document type");
      return;
    }

    const userId = req.user!._id.toString();

    let application = await findApplicationByUserId(userId);
    if (!application) {
      application = await KycApplicationModel.create({
        userId,
        status: "NOT_STARTED",
        documents: [],
      });
    }

    const { s3Key, s3Bucket } = await uploadToS3(
      file,
      userId,
      docTypeParsed.data
    );

    await addDocumentToApplication(userId, {
      type: docTypeParsed.data,
      s3Key,
      s3Bucket,
    });

    sendSuccess(
      res,
      { s3Key, documentType: docTypeParsed.data },
      "Document uploaded successfully",
      201
    );
  } catch (error) {
    logger.error("Upload error:", error);
    sendError(res, "Failed to upload document", 500);
  }
}

export async function getDocumentUrl(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const { key } = req.params;
    if (!key) {
      sendError(res, "Document key is required");
      return;
    }

    const url = await getPresignedUrl(decodeURIComponent(key));
    sendSuccess(res, { url }, "Presigned URL generated");
  } catch (error) {
    logger.error("Get document URL error:", error);
    sendError(res, "Failed to generate document URL", 500);
  }
}
