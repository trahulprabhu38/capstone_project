import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KYCGate Admin — Management Panel",
  description: "Admin panel for managing KYC applications and users.",
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
