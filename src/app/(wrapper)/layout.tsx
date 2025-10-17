import type { ReactNode } from "react";
import AuthProvider from "@/context/auth.provider";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Toaster } from "sonner";
import Footer from "@/components/shared/footer";

export const metadata = {
  title: "Exam App",
  description: "An app for managing and taking exams",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slugId: string };
}) {
  return (
    <div>
      <AuthProvider>
        <SidebarProvider>
          <div className="mx-auto flex w-full min-h-screen">
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
              {/* ===== Footer ===== */}
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      </AuthProvider>
    </div>
  );
}
