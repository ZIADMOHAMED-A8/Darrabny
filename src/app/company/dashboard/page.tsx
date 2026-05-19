"use client";

import { useCompanyDashboard } from "./hooks/use-company-dashboard";
import OngoingInternships from "./_components/ongoing-internships";
import CompanySideWidgets from "./_components/company-side-widgets";
import DashboardTopRow from "./_components/company-stats";

export default function CompanyDashboardPage() {
  const { data, isLoading, error } = useCompanyDashboard();

  if (isLoading) {
    return (
      <main className="px-8 py-10 min-h-screen">
        <div className="text-center text-gray-500">Loading dashboard...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="px-8 py-10 min-h-screen">
        <div className="text-center text-red-500">Failed to load dashboard</div>
      </main>
    );
  }

  if (!data) return null;

  return (
    <main className="px-8 py-10 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Company Overview
      </h1>

      <div className="mt-6">
        <DashboardTopRow kpis={data.kpis} />
      </div>

      <section className="mt-8 grid gap-7 lg:grid-cols-6 items-start">
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
