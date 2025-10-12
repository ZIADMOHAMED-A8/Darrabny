
// src/app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
// import { Toaster } from "@/components/ui/sonner";
// import TokenInitializer from "@/components/token-initializer";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import QueryProvider from "@/context/query.provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-heading" });

export const metadata = {
  title: "EXAMM APP",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistMono?.variable ?? ""} ${inter?.variable ?? ""} font-sans`}>
        {/* <TokenInitializer />   */}
         <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster />         
      </body>
    </html>
  );
}




// import type { ReactNode } from "react";
// import "./globals.css";
// import { Inter } from "next/font/google";
// import AuthProvider from "@/context/auth.provider";
// import SiteBreadcrumb from "@/components/site-breadcrumb";
// import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";
// import TokenInitializer from "@/components/token-initializer";
// import { Toaster } from "sonner";
// import { GeistMono } from "geist/font/mono";
// import {TokenInitializer} from "@/components/token-initializer";


// const inter = Inter({ subsets: ["latin"], variable: "--font-heading" });



// export const metadata = {
//   title: "Exam App",
//   description: "An app for managing and taking exams",
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//        <body className={`${GeistMono.variable} ${inter.variable} font-sans`}>
//         <TokenInitializer />
//         <SidebarProvider>
//           <div className="mx-auto flex w-full min-h-screen">
            {/* السايدبار على الشمال */}
            // <AppSidebar />

            {/* المحتوى */}
            // <div className="flex-1 bg-[#f5f7fb]">
              {/* Breadcrumb فوق كل الصفحات */}
              {/* <nav aria-label="breadcrumb" className="p-4 border-b bg-white">
                <SiteBreadcrumb />
              </nav> */}

              // <main className="min-h-[calc(100vh-140px)]">
              //   {/* <SidebarTrigger /> */}
              //   <AuthProvider>{children}</AuthProvider>
              //   <Toaster
              //     richColors
              //     position="bottom-right"
              //     dir="rtl"
              //     closeButton
              //     duration={3000}
              //     toastOptions={{
              //       style: {
              //         backgroundColor: "#1F2937",
              //         color: "#fff",
              //       },
              //     }}
              //   />
              // </main>

//               <footer className="bg-gray-100 text-center p-4 text-sm">
//                 © {new Date().getFullYear()} Exam App. All rights reserved.
//               </footer>
//             </div>
//           </div>
//         </SidebarProvider>
//       </body>
//     </html>
//   );
// }
