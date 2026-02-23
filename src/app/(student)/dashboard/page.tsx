import InternshipCard from "./_components/InternshipProfile";
import StatsCard from "./_components/StatsCard";
import SavedList from "./_components/SavedList";

import {
  activeInternships,
  dashboardStats,
  savedInternships,
} from "@/data/dashboard";
import HomeBg from "@/app/_components/home-bg";
import Sidebar from "@/app/_components/Sidebar";


export default function DashboardPage() {
  return (

    <section className=" min-h-screen  ">
      {/* Header */}
      <div className="w-full">
        <h1 className="text-3xl font-bold">Welcome back, Sophia</h1>
        <p className="text-gray-600 mt-1">
          Currently Active Internship
        </p>
      </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
