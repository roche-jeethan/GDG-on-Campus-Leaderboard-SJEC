import type { Metadata } from "next";
import localFont from "next/font/local";
import QueryProvider from "@/components/QueryProvider";
import "./globals.css";

const googleSans = localFont({
  src: [
    {
      path: "../public/fonts/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cloud Study Jams Leaderboard",
  description:
    "Dynamic leaderboard for Google Cloud Study Jams participants showcasing their progress with skill badges and arcade games.",
  keywords: [
    "Google Cloud",
    "Study Jams",
    "Leaderboard",
    "Cloud Skills",
    "Learning",
  ],
  authors: [{ name: "Cloud Study Jams Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${googleSans.variable} antialiased min-h-screen bg-gray-900 text-white font-sans`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
