import type { KycStatus, UserRole, DocumentType } from "./constants";

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KycDocument {
  type: DocumentType;
  s3Key: string;
  s3Bucket: string;
  uploadedAt: string;
}

export interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  country: string;
  phone: string;
}

export interface KycApplication {
  _id: string;
  userId: string;
  status: KycStatus;
  personalInfo: PersonalInfo;
  walletAddress?: string;
  documents: KycDocument[];
  adminRemarks?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface KycSubmitRequest {
  personalInfo: PersonalInfo;
  walletAddress?: string;
}

export interface AdminReviewRequest {
  status: "APPROVED" | "REJECTED";
  adminRemarks?: string;
}

export interface DashboardStats {
  totalApplications: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
  totalUsers: number;
}
