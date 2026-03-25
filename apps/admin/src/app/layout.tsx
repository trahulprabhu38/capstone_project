import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrustLayer Admin — Management Panel",
  description: "Admin panel for managing TrustLayer KYC applications and users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
