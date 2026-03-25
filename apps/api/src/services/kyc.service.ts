import { KycApplicationModel, IKycApplication } from "../models/KycApplication";
import type { KycStatus } from "@kyc-platform/shared";
import mongoose from "mongoose";

export async function findApplicationByUserId(
  userId: string
): Promise<IKycApplication | null> {
  return KycApplicationModel.findOne({ userId });
}

export async function createOrUpdateApplication(
  userId: string,
  data: {
    personalInfo: {
      fullName: string;
      dateOfBirth: string;
      country: string;
      state: string;
      city: string;
      phone: string;
    };
    documentDetails?: {
      nameOnDocument: string;
      documentNumber: string;
      dateOfBirth: string;
      expiryDate?: string;
      issuingAuthority?: string;
    };
    walletAddress?: string;
  }
): Promise<IKycApplication> {
  const existing = await findApplicationByUserId(userId);

  if (existing) {
    existing.personalInfo = data.personalInfo;
    if (data.documentDetails) existing.documentDetails = data.documentDetails;
    if (data.walletAddress) existing.walletAddress = data.walletAddress;
    existing.status = "PENDING";
    existing.submittedAt = new Date();
    existing.adminRemarks = undefined;
    return existing.save();
  }

  return KycApplicationModel.create({
    userId,
    personalInfo: data.personalInfo,
    documentDetails: data.documentDetails,
    walletAddress: data.walletAddress,
    status: "PENDING",
    submittedAt: new Date(),
  });
}

export async function updateApplicationStatus(
  applicationId: string,
  status: KycStatus,
  adminId: string,
  remarks?: string
): Promise<IKycApplication | null> {
  return KycApplicationModel.findByIdAndUpdate(
    applicationId,
    {
      status,
      adminRemarks: remarks,
      reviewedBy: new mongoose.Types.ObjectId(adminId),
      reviewedAt: new Date(),
    },
    { new: true }
  );
}

export async function addDocumentToApplication(
  userId: string,
  document: {
    type: string;
    s3Key: string;
    s3Bucket: string;
  }
): Promise<IKycApplication | null> {
  const application = await findApplicationByUserId(userId);
  if (!application) return null;

  const existingDocIndex = application.documents.findIndex(
    (doc) => doc.type === document.type
  );

  if (existingDocIndex >= 0) {
    application.documents[existingDocIndex] = {
      ...document,
      uploadedAt: new Date(),
    } as any;
  } else {
    application.documents.push({
      ...document,
      uploadedAt: new Date(),
    } as any);
  }

  return application.save();
}

export async function getAllApplications(
  statusFilter?: KycStatus,
  search?: string,
  page = 1,
  limit = 20
): Promise<{ applications: IKycApplication[]; total: number }> {
  const query: any = {};

  if (statusFilter) {
    query.status = statusFilter;
  }

  if (search) {
    query.$or = [
      { "personalInfo.fullName": { $regex: search, $options: "i" } },
    ];
  }

  const [applications, total] = await Promise.all([
    KycApplicationModel.find(query)
      .populate("userId", "email fullName")
      .populate("reviewedBy", "email fullName")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    KycApplicationModel.countDocuments(query),
  ]);

  return { applications, total };
}

export async function getApplicationById(
  id: string
): Promise<IKycApplication | null> {
  return KycApplicationModel.findById(id)
    .populate("userId", "email fullName")
    .populate("reviewedBy", "email fullName");
}

export async function getDashboardStats() {
  const [total, pending, underReview, approved, rejected] = await Promise.all([
    KycApplicationModel.countDocuments(),
    KycApplicationModel.countDocuments({ status: "PENDING" }),
    KycApplicationModel.countDocuments({ status: "UNDER_REVIEW" }),
    KycApplicationModel.countDocuments({ status: "APPROVED" }),
    KycApplicationModel.countDocuments({ status: "REJECTED" }),
  ]);

  return { totalApplications: total, pending, underReview, approved, rejected };
}
