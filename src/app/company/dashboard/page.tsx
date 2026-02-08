"use client";

import Image from "next/image";
import OngoingInternships from "./_components/ongoing-internships";
import CompanySideWidgets from "./_components/company-side-widgets";
import DashboardTopRow from "./_components/company-stats";

export default function CompanyDashboardPage() {
  return (
    <main className="relative px-16 min-h-screen overflow-hidden bg-[var(--ic-bg)] text-white">
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
        <h1 className="text-4xl font-extrabold text-white/90">
          Company Overview
        </h1>

        <div className="mt-8">
          <DashboardTopRow />
        </div>

        <section className="mt-8 grid gap-7 md:grid-cols-6 items-start">
          <div className="md:col-span-4">
            <OngoingInternships />
          </div>

          <aside className="md:col-span-2">
            <CompanySideWidgets />
          </aside>
        </section>

        <div className="h-10" />
      </div>
    </main>
  );
}
