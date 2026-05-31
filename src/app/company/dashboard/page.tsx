"use client";

import { useCompanyDashboard } from "./hooks/use-company-dashboard";
import OngoingInternships from "./_components/ongoing-internships";
import CompanySideWidgets from "./_components/company-side-widgets";
import DashboardTopRow from "./_components/company-stats";

export default function CompanyDashboardPage() {
  const { data, isLoading, error } = useCompanyDashboard();

  if (isLoading) {
    return (
      <main className="min-h-screen px-4 py-8 sm:px-6 md:px-8 md:py-10">
        <div className="text-center text-gray-500">Loading dashboard...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen px-4 py-8 sm:px-6 md:px-8 md:py-10">
        <div className="text-center text-red-500">Failed to load dashboard</div>
      </main>
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen  bg-[#F3F4F6] px-4 py-8 sm:px-6 md:px-8 md:py-10">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
        Company Overview
      </h1>

      <div className="mt-6">
        <DashboardTopRow kpis={data.kpis} />
      </div>

      <section className="mt-8 grid items-start gap-6 lg:grid-cols-6 lg:gap-7">
        <div className="lg:col-span-4">
          <OngoingInternships internships={data.ongoingInternships} />
        </div>

        <aside className="lg:col-span-2">
          <CompanySideWidgets
            acceptanceRate={data.acceptanceRate}
            verification={data.verificationStatus}
            academicPartners={data.academicPartners}
          />
        </aside>
      </section>

      <div className="h-10" />
    </main>
  );
}
