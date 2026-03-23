import type { ReactNode } from "react";
import CompanyNavbar from "./dashboard/_components/company-navbar";
import Footer from "@/components/shared/footer";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <CompanyNavbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
