"use client";

import { useState } from "react";
import Image from "next/image";

import CompanyInternshipsHeader from "./_components/company-internships-header";
import CompanyInternshipsTabs from "./_components/company-internships-tabs";
import CompanyInternshipsGrid from "./_components/company-internships-grid";
import CompanyInternshipsPagination from "./_components/company-internships-pagination";

import { CompanyInternshipStatus } from "./_data/internships";

export default function CompanyInternshipsPage() {
  const [tab, setTab] = useState<CompanyInternshipStatus>("all");

  return (
    <main className="relative px-16 min-h-screen overflow-hidden bg-[var(--ic-bg)] text-white">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-90"
        />
      </div>

      <div className="relative z-10 py-10">
        <CompanyInternshipsHeader />

        <CompanyInternshipsTabs tab={tab} onChange={setTab} />

        <CompanyInternshipsGrid tab={tab} />

        <CompanyInternshipsPagination />
      </div>
    </main>
  );
}
