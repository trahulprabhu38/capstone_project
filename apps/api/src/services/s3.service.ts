import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../config/s3";
import { env } from "../config/env";
import { PRESIGNED_URL_EXPIRY } from "@kyc-platform/shared";
import path from "path";

export async function uploadToS3(
  file: Express.Multer.File,
  userId: string,
  documentType: string
): Promise<{ s3Key: string; s3Bucket: string }> {
  const ext = path.extname(file.originalname) || ".jpg";
  const sanitizedExt = ext.replace(/[^a-zA-Z0-9.]/g, "");
  const key = `${userId}/${documentType}_${Date.now()}${sanitizedExt}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return {
    s3Key: key,
    s3Bucket: env.S3_BUCKET_NAME,
  };
}

export async function getPresignedUrl(s3Key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: s3Key,
  });

  return getSignedUrl(s3Client, command, { expiresIn: PRESIGNED_URL_EXPIRY });
}
