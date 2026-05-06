"use client";

import InternshipCard from "./_components/InternshipProfile";
import StatsCard from "./_components/StatsCard";
import SavedList from "./_components/SavedList";
import useGetStudentDashboard from "@/app/(student)/dashboard/hooks/useGetStudentDashboard";
type DashboardResponse = {
  user?: {
    firstName?: string;
    lastName?: string;
  };
  activeInternships?: Array<{
    id: string;
    title?: string;
    location?: string;
    progress?: number;
    workMode?: string;
    isPaid?: boolean;
    company?: {
      name?: string;
    };
  }>;
  stats?: {
    internshipsCompleted?: number;
    averageCompanyRating?: number;
  };
  savedInternships?: Array<{
    id: string;
    title?: string;
    company?: {
      name?: string;
    };
  }>;
};


export default function DashboardPage() {
  const { data, isLoading, isError, error } = useGetStudentDashboard({
    activeLimit: 5,
    savedLimit: 5,
  });
  const dashboardData = (data ?? {}) as DashboardResponse;

  const fullName =
    [dashboardData.user?.firstName, dashboardData.user?.lastName]
      .filter(Boolean)
      .join(" ") ||
    "Student";

  const activeInternships = (dashboardData.activeInternships ?? []).map((item) => ({
    id: item.id,
    title: item.title ?? "Untitled Internship",
    company: item.company?.name ?? "Unknown Company",
    location: item.location ?? "N/A",
    progress: Number(item.progress ?? 0),
    type: [item.workMode ?? "N/A", item.isPaid ? "Paid" : "Unpaid"],
  }));

  const dashboardStats = [
    {
      label: "Internships completed",
      value: dashboardData.stats?.internshipsCompleted ?? 0,
    },
    {
      label: "Company Evaluations",
      value: `${dashboardData.stats?.averageCompanyRating ?? 0}/5`,
    },
  ];

  const savedInternships = (dashboardData.savedInternships ?? []).map((item) => ({
    id: item.id,
    title: item.title ?? "Untitled Internship",
    company: item.company?.name ?? "Unknown Company",
  }));

  return (
    <section className=" min-h-screen flex flex-col gap-[12px]  ">
      {/* Header */}
      <div className="w-full">
        <h1 className="text-3xl font-bold">Welcome back, {fullName}</h1>
        <p className="text-gray-600 mt-1">
          Currently Active Internship
        </p>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Loading dashboard...</p>}
      {isError && (
        <p className="text-sm text-red-600">
          {(error as Error)?.message || "Failed to load dashboard."}
        </p>
      )}

      {/* Active Internships */}
      <div className="grid gap-5">
        {activeInternships.map((item) => (
          <InternshipCard key={item.id} {...item} />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {dashboardStats.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Saved */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Saved</h2>
            <button className="text-blue-600 text-sm">See all</button>
          </div>

          <div className="rounded-xl bg-white/60 backdrop-blur p-4 space-y-4 shadow-sm">
            {savedInternships.map((item) => (
              <SavedList key={item.id} {...item} />
            ))}
            {!isLoading && !isError && savedInternships.length === 0 && (
              <p className="text-sm text-gray-500">No saved internships yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
