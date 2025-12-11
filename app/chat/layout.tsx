import type React from "react";
import type { Metadata, Viewport } from "next";
import { RileyHeader } from "@/features/chat/components/riley-header";
import ChatHistory from "@/features/chat/containers/chat-history";

export const metadata: Metadata = {
  title: "Wellness Partners | Multi-Specialty Health Clinic",
  description:
    "Your trusted multi-specialty wellness clinic offering personalized care, expert specialists, and a patient-first experience.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4d9c9c",
  width: "device-width",
  initialScale: 1,
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh bg-background overflow-hidden">
      <aside className="hidden md:block w-80 shrink-0 h-full">
        <ChatHistory />
      </aside>
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <RileyHeader />
        <main className="flex-1 overflow-hidden relative">{children}</main>
      </div>
    </div>
  );
}
