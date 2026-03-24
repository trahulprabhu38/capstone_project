import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserModel, IUser } from "../models/User";

const BCRYPT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY,
  } as jwt.SignOptions);
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY,
  } as jwt.SignOptions);
}

export function generateTokens(userId: string) {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
}

export function verifyRefreshToken(token: string): { userId: string } {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return UserModel.findOne({ email: email.toLowerCase() });
}

export async function findUserByEmailWithPassword(
  email: string
): Promise<IUser | null> {
  return UserModel.findOne({ email: email.toLowerCase() }).select("+password");
}

export async function createUser(
  email: string,
  password: string
): Promise<IUser> {
  const hashedPassword = await hashPassword(password);
  return UserModel.create({
    email: email.toLowerCase(),
    password: hashedPassword,
    role: "user",
  });
}
