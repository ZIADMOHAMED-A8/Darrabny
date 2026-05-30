import type { ReactNode } from "react";
import Footer from "@/components/shared/footer";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
