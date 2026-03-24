import mongoose from "mongoose";
import { env } from "../config/env";
import { UserModel } from "../models/User";
import { hashPassword } from "../services/auth.service";
import { logger } from "../utils/logger";

async function seedAdmin() {
  const args = process.argv.slice(2);
  const emailIdx = args.indexOf("--email");
  const passIdx = args.indexOf("--password");

  const email = emailIdx >= 0 ? args[emailIdx + 1] : "admin@game.com";
  const password = passIdx >= 0 ? args[passIdx + 1] : "Admin@123";

  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("Connected to MongoDB");

    const existing = await UserModel.findOne({ email });
    if (existing) {
      logger.info(`Admin user ${email} already exists`);
      process.exit(0);
    }

    const hashed = await hashPassword(password);
    await UserModel.create({
      email,
      password: hashed,
      role: "admin",
      fullName: "Platform Admin",
    });

    logger.info(`Admin user created: ${email}`);
  } catch (error) {
    logger.error("Seed error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
