import { Request, Response } from "express";
import { signupSchema, loginSchema } from "@kyc-platform/shared";
import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  comparePassword,
  generateTokens,
  verifyRefreshToken,
} from "../services/auth.service";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { AuthRequest } from "../middleware/auth";
import { UserModel } from "../models/User";
import { logger } from "../utils/logger";

export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, parsed.error.errors[0].message);
      return;
    }

    const { email, password } = parsed.data;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      sendError(res, "Email already registered", 409);
      return;
    }

    const user = await createUser(email, password);
    const tokens = generateTokens(user._id.toString());

    sendSuccess(
      res,
      {
        user: { _id: user._id, email: user.email, role: user.role, isBlocked: false },
        ...tokens,
      },
      "Account created successfully",
      201
    );
  } catch (error) {
    logger.error("Signup error:", error);
    sendError(res, "Failed to create account", 500);
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, parsed.error.errors[0].message);
      return;
    }

    const { email, password } = parsed.data;

    const user = await findUserByEmailWithPassword(email);
    if (!user) {
      sendError(res, "Invalid email or password", 401);
      return;
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      sendError(res, "Invalid email or password", 401);
      return;
    }

    const tokens = generateTokens(user._id.toString());

    sendSuccess(res, {
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        isBlocked: user.isBlocked,
        blockReason: user.blockReason,
      },
      ...tokens,
    }, "Login successful");
  } catch (error) {
    logger.error("Login error:", error);
    sendError(res, "Login failed", 500);
  }
}

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      sendError(res, "Not authenticated", 401);
      return;
    }

    sendSuccess(res, {
      _id: req.user._id,
      email: req.user.email,
      role: req.user.role,
      fullName: req.user.fullName,
      isBlocked: req.user.isBlocked,
      blockReason: req.user.blockReason,
      createdAt: req.user.createdAt,
    });
  } catch (error) {
    logger.error("GetMe error:", error);
    sendError(res, "Failed to get user info", 500);
  }
}

export async function refreshToken(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      sendError(res, "Refresh token is required", 400);
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      sendError(res, "User not found", 401);
      return;
    }

    const tokens = generateTokens(user._id.toString());
    sendSuccess(res, tokens, "Token refreshed");
  } catch (error) {
    sendError(res, "Invalid refresh token", 401);
  }
}
