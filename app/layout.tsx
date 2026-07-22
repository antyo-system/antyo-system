import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/app/components/layout/sidebar";
import Header from "@/app/components/layout/header";
import { TimerProvider } from "@/app/lib/timer-context";
import FloatingMiniPlayer from "@/app/components/timer/floating-mini-player";
import SessionCompleteModal from "@/app/components/timer/session-complete-modal";
import AIChatbotFAB from "@/app/components/ai-chatbot-fab";

export const metadata: Metadata = {
  title: "ANTYO System — Autonomous Life Operating System",
  description: "Unified Life ERP optimizing time, money, health, relationships, and story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="flex h-screen overflow-hidden bg-zinc-950 font-sans text-zinc-100 antialiased">
        <TimerProvider>
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 bg-zinc-950">
              {children}
            </main>
          </div>
          <FloatingMiniPlayer />
          <SessionCompleteModal />
          <AIChatbotFAB />
        </TimerProvider>
      </body>
    </html>
  );
}
