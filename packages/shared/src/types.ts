import type { KycStatus, UserRole, DocumentType } from "./constants";

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  isBlocked?: boolean;
  blockReason?: string;
  blockedAt?: string;
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
  state: string;
  city: string;
  phone: string;
}

export interface DocumentDetails {
  nameOnDocument: string;
  documentNumber: string;
  dateOfBirth: string;
  expiryDate?: string;
  issuingAuthority?: string;
}

export interface KycApplication {
  _id: string;
  userId: string;
  status: KycStatus;
  personalInfo: PersonalInfo;
  documentDetails?: DocumentDetails;
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
  documentDetails?: DocumentDetails;
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
