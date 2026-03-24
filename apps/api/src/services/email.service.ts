import { logger } from "../utils/logger";

/**
 * Placeholder email service. Replace with nodemailer or
 * another SMTP library once SMTP credentials are configured.
 */
export async function sendStatusNotification(
  email: string,
  status: "APPROVED" | "REJECTED",
  remarks?: string
): Promise<void> {
  // Reason: real email sending is deferred until SMTP is configured
  logger.info(
    `[Email] Would send ${status} notification to ${email}` +
      (remarks ? ` — Remarks: ${remarks}` : "")
  );
}
