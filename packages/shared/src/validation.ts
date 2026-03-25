import { z } from "zod";
import { KYC_STATUS, DOCUMENT_TYPE, ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "./constants";

export const emailSchema = z.string().email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  dateOfBirth: z.string().refine(
    (date) => {
      const parsed = new Date(date);
      const now = new Date();
      const age = now.getFullYear() - parsed.getFullYear();
      return !isNaN(parsed.getTime()) && age >= 18;
    },
    { message: "You must be at least 18 years old" }
  ),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City/Town is required"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long")
    .regex(/^\+?[\d\s-]+$/, "Invalid phone number format"),
});

export const documentDetailsSchema = z.object({
  nameOnDocument: z.string().min(1, "Name on document is required"),
  documentNumber: z.string().min(1, "Document number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  expiryDate: z.string().optional(),
  issuingAuthority: z.string().optional(),
});

export const walletAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum wallet address");

export const kycSubmitSchema = z.object({
  personalInfo: personalInfoSchema,
  documentDetails: documentDetailsSchema.optional(),
  walletAddress: walletAddressSchema.optional(),
});

export const adminReviewSchema = z.object({
  status: z.enum([KYC_STATUS.APPROVED, KYC_STATUS.REJECTED]),
  adminRemarks: z.string().optional(),
}).refine(
  (data) => {
    if (data.status === KYC_STATUS.REJECTED && (!data.adminRemarks || data.adminRemarks.trim() === "")) {
      return false;
    }
    return true;
  },
  {
    message: "Remarks are required when rejecting an application",
    path: ["adminRemarks"],
  }
);

export const documentTypeSchema = z.enum([
  DOCUMENT_TYPE.ID_FRONT,
  DOCUMENT_TYPE.ID_BACK,
  DOCUMENT_TYPE.SELFIE,
]);

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type KycSubmitInput = z.infer<typeof kycSubmitSchema>;
export type AdminReviewInput = z.infer<typeof adminReviewSchema>;
