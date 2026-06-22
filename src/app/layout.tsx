import type { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/providers";
import ChatbotWidget from "@/components/shared/ChatbotWidget";
import ConditionalStudentTopBar from "./_components/ConditionalStudentTopBar";
import StudentTopBar from "./_components/StudentTopBar";
export const dynamic = 'force-dynamic';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
      <Toaster position="bottom-right" />
        <Providers>
        <ConditionalStudentTopBar></ConditionalStudentTopBar>
          {children}
          <div className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[92vw] sm:bottom-6 sm:right-6">
            <ChatbotWidget />
          </div>
        </Providers>
      </body>
    </html>
  );
}
