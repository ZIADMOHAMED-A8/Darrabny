import type { ReactNode } from "react";
import "./globals.css";
import Providers from "@/components/providers";
import ChatbotWidget from "@/components/shared/ChatbotWidget";
import StudentTopBar from "./_components/StudentTopBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>
          <StudentTopBar></StudentTopBar>
          {children}
          <div className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[92vw] sm:bottom-6 sm:right-6">
            <ChatbotWidget />
          </div>
        </Providers>
      </body>
    </html>
  );
}
