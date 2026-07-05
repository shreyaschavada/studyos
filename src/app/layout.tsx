import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyOS — The AI-Powered Operating System for Students",
  description:
    "StudyOS combines AI tutoring, smart notes, task management, focus tools, and analytics into one beautiful workspace designed for students.",
  keywords: ["study", "AI tutor", "student productivity", "notes", "education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#09090B] text-[#FAFAFA] antialiased">
        {children}
      </body>
    </html>
  );
}
