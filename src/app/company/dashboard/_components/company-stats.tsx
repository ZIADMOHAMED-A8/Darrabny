"use client";

import { CalendarDays, Users } from "lucide-react";

export default function DashboardTopRow() {
  return (
    <div className="grid gap-7 md:grid-cols-6 items-stretch">
      {/* Left (4 cols): 2 stats */}
      <div className="md:col-span-4 h-full">
        <div className="grid gap-7 md:grid-cols-4 h-full items-stretch">
          <div className="md:col-span-2 h-full">
            <TotalApplicantsCard />
          </div>

          <div className="md:col-span-2 h-full">
            <TotalCompletedCard />
          </div>
        </div>
      </div>

      {/* Right (2 cols): active postings */}
      <div className="md:col-span-2 h-full">
        <ActivePostingsCard />
      </div>
    </div>
  );
}

/* --- Cards (no props) --- */

function TotalApplicantsCard() {
  return (
    <div className="w-full h-full rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between px-7 pt-7">
        <div className="text-sm font-extrabold text-[#0b1f33]/80">
          Total Applicants
        </div>
        <Users className="h-5 w-5 text-[#0b1f33]/70" />
      </div>

      <div className="px-7 pb-7 pt-4">
        <div className="flex items-end gap-3">
          <div className="text-3xl font-extrabold">124</div>
          <div className="pb-1 text-sm font-bold text-[#2f7d32]">↗ +12%</div>
        </div>
        <div className="mt-2 text-sm text-[#0b1f33]/60">From last month</div>
      </div>
    </div>
  );
}

function TotalCompletedCard() {
  return (
    <div className="w-full h-full rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between px-7 pt-7">
        <div className="text-sm font-extrabold text-[#0b1f33]/80">
          Total Completed Trainees
        </div>
        <Users className="h-5 w-5 text-[#0b1f33]/70" />
      </div>

      <div className="px-7 pb-7 pt-4">
        <div className="flex items-end gap-3">
          <div className="text-3xl font-extrabold">625</div>
          <div className="pb-1 text-sm font-bold text-[#2f7d32]">↗ +24%</div>
        </div>
        <div className="mt-2 text-sm text-[#0b1f33]/60">From last year</div>
      </div>
    </div>
  );
}

function ActivePostingsCard() {
  return (
    <div className="w-full h-full rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between px-7 pt-7">
        <div className="text-sm font-extrabold text-[#0b1f33]/80">
          Active Postings
        </div>
        <CalendarDays className="h-5 w-5 text-[#0b1f33]/70" />
      </div>

      <div className="px-7 pb-7 pt-4">
        <div className="text-3xl font-extrabold">35</div>

        <div className="mt-3 flex items-center gap-3">
          <span className="rounded-md bg-[#c7ddff] px-3 py-1 text-xs font-semibold text-[#0b1f33]/80">
            20 Internships
          </span>
          <span className="rounded-md bg-[#c7ddff] px-3 py-1 text-xs font-semibold text-[#0b1f33]/80">
            15 Jobs
          </span>
        </div>
      </div>
    </div>
  );
}
