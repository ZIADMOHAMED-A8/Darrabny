import type { ReactNode } from "react";
//  import "../globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/auth.provider";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
//  import TokenInitializer from "@/components/token-initializer";
import { Toaster } from "sonner";
import { AlignJustify, Menu, MenuIcon } from "lucide-react";
//  import {TokenInitializer} from "@/components/token-initializer";

// import ArrowBack from "@/components/arrow-back";

// const inter = Inter({ subsets: ["latin"], variable: "--font-heading" });

export const metadata = {
  title: "Exam App",
  description: "An app for managing and taking exams",
};

export default async function RootLayout({ children,
  params,
}: {
  children: ReactNode;
  params: { slugId: string };
}) {
  return (
    <div>
      {/* <TokenInitializer /> */}
      <AuthProvider>
        <SidebarProvider>
          <div className="mx-auto flex w-full min-h-screen">
            {/* السايدبار على الشمال */}
            <AppSidebar />
            {/* <nav aria-label="breadcrumb" className="p-4 border-r border--200 flex gap-3">
              <SidebarTrigger/>
            </nav> */}
            {/* المحتوى */}
            <div className="flex-1 bg-gray-50">
              {/* Breadcrumb فوق كل الصفحات */}
              <nav aria-label="breadcrumb" className="p-4 border-b bg-white">
                <SiteBreadcrumb />
              </nav>

              <main className="min-h-[calc(100vh-140px)]">
                {/* <SidebarTrigger /> */}
                {children}
                <Toaster
                  richColors
                  position="bottom-right"
                  dir="rtl"
                  closeButton
                  duration={3000}
                  toastOptions={{
                    style: {
                      backgroundColor: "#1F2937",
                      color: "#fff",
                    },
                  }}
                />
              </main>

              <footer className="bg-gray-100 text-center p-4 text-sm">
                © {new Date().getFullYear()} Exam App. All rights reserved.
              </footer>
            </div>
          </div>
        </SidebarProvider>
      </AuthProvider>
    </div>

  );
}

