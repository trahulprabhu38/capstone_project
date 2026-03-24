import mongoose, { Document, Schema } from "mongoose";
import type { KycStatus, DocumentType } from "@kyc-platform/shared";

export interface IKycDocument {
  type: DocumentType;
  s3Key: string;
  s3Bucket: string;
  uploadedAt: Date;
}

export interface IPersonalInfo {
  fullName: string;
  dateOfBirth: string;
  country: string;
  phone: string;
}

export interface IKycApplication extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  status: KycStatus;
  personalInfo: IPersonalInfo;
  walletAddress?: string;
  documents: IKycDocument[];
  adminRemarks?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const kycDocumentSchema = new Schema<IKycDocument>(
  {
    type: {
      type: String,
      enum: ["ID_FRONT", "ID_BACK", "SELFIE"],
      required: true,
    },
    s3Key: { type: String, required: true },
    s3Bucket: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const personalInfoSchema = new Schema<IPersonalInfo>(
  {
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const kycApplicationSchema = new Schema<IKycApplication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["NOT_STARTED", "PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED"],
      default: "NOT_STARTED",
    },
    personalInfo: { type: personalInfoSchema },
    walletAddress: { type: String },
    documents: [kycDocumentSchema],
    adminRemarks: { type: String },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
    submittedAt: { type: Date },
  },
  { timestamps: true }
);

export const KycApplicationModel = mongoose.model<IKycApplication>(
  "KycApplication",
  kycApplicationSchema
);
