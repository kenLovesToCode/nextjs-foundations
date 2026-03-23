import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "../components/google-analytics"; // Ensure Google Analytics is initialized

import "./globals.css";

// Variable font - all weights in single file
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

// Monospace font for code blocks
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="container mx-auto px-4 py-8 font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        /> */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
