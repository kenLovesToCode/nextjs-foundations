import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  // title: process.env.NEXT_PUBLIC_APP_NAME || "Vercel Academy Foundation - Web",
  title: {
    template: "%s | Next.js Foundations",
    default: process.env.NEXT_PUBLIC_APP_NAME || "Next.js Foundations",
  },
  description: "Next.js Foundations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Global providers would go here (theme, auth, etc.) */}
        {children}
      </body>
    </html>
  );
}
