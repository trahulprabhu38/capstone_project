import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface EnvConfig {
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRY: string;
  JWT_REFRESH_EXPIRY: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  S3_BUCKET_NAME: string;
  GAME_WEBGL_URL: string;
  ONBOARDING_URL: string;
  ADMIN_URL: string;
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USER?: string;
  SMTP_PASS?: string;
}

function loadEnv(): EnvConfig {
  const required = [
    "MONGODB_URI",
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return {
    PORT: parseInt(process.env.PORT || "5001", 10),
    MONGODB_URI: process.env.MONGODB_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || "15m",
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "7d",
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
    AWS_REGION: process.env.AWS_REGION || "ap-south-1",
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || "kyc-game-documents",
    GAME_WEBGL_URL: process.env.GAME_WEBGL_URL || "https://your-game.com",
    ONBOARDING_URL: process.env.ONBOARDING_URL || "http://localhost:3000",
    ADMIN_URL: process.env.ADMIN_URL || "http://localhost:3001",
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  };
}

export const env = loadEnv();
