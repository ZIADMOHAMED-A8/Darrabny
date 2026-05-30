import type { ReactNode } from "react";
import CompanyAccountSidebar from "../_components/company-account-sidebar";

export default function CompanyVerificationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#EEF2F8]">
      <CompanyAccountSidebar />
      <div className="md:ml-[220px]">{children}</div>
    </div>
  );
}
