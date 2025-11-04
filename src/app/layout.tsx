import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Dashboard - AI-Powered Life Management",
  description: "Comprehensive personal dashboard with AI-powered financial tracking, task management, and smart insights.",
  keywords: ["Personal Dashboard", "AI Assistant", "Financial Tracker", "Task Management", "Productivity", "Next.js", "TypeScript"],
  authors: [{ name: "Personal Dashboard Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Personal Dashboard - AI-Powered Life Management",
    description: "Manage your finances, tasks, and life with AI-powered insights and automation",
    url: "https://chat.z.ai",
    siteName: "Personal Dashboard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Dashboard - AI-Powered Life Management",
    description: "Manage your finances, tasks, and life with AI-powered insights and automation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
