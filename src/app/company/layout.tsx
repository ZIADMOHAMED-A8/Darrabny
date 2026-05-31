"use client"
import type { ReactNode } from "react";
import Footer from "@/components/shared/footer";
import { usePathname } from "next/navigation";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  const path=usePathname()
  const isForbidden= path==='/company/profile' || path==='/company/settings' || path==='/company/verification'
  console.log(path,'dsdsds')
  return (
    <div className="min-h-screen flex flex-col text-white">
      <main className="flex-1">{children}</main>

      {!isForbidden && <Footer />}
    </div>
  );
}
