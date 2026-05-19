"use client";

import { Briefcase, Users } from "lucide-react";
import type { CompanyKpis } from "../actions/get-company-dashboard.action";

interface DashboardTopRowProps {
  kpis: CompanyKpis;
}

export default function DashboardTopRow({ kpis }: DashboardTopRowProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 items-stretch">
      <TotalApplicantsCard
        count={kpis.totalApplicants.count}
        growth={kpis.totalApplicants.growthPct}
      />
      <TotalCompletedCard
        count={kpis.totalCompletedTrainees.count}
        growth={kpis.totalCompletedTrainees.growthPct}
      />
      <ActivePostingsCard
        total={kpis.activePostings.total}
        internships={kpis.activePostings.internships}
        jobs={kpis.activePostings.jobs}
      />
    </div>
  );
}

interface TotalApplicantsCardProps {
  count: number;
  growth: number;
}

function TotalApplicantsCard({ count, growth }: TotalApplicantsCardProps) {
  return (
    <div className="rounded-xl bg-blue-50 p-6 shadow-sm border border-blue-100">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Total Applicants</h3>
        <Users className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex items-end gap-2">
        <div className="text-3xl font-bold text-gray-900">{count}</div>
        {growth > 0 && (
          <span className="text-sm font-semibold text-green-600">
            ↗ +{growth}%
          </span>
        )}
        {growth < 0 && (
          <span className="text-sm font-semibold text-red-600">
            ↘ {growth}%
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">From last month</p>
    </div>
  );
}

interface TotalCompletedCardProps {
  count: number;
  growth: number;
}

function TotalCompletedCard({ count, growth }: TotalCompletedCardProps) {
  return (
    <div className="rounded-xl bg-blue-50 p-6 shadow-sm border border-blue-100">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Total Completed Trainees
        </h3>
        <Users className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex items-end gap-2">
        <div className="text-3xl font-bold text-gray-900">{count}</div>
        {growth > 0 && (
          <span className="text-sm font-semibold text-green-600">
            ↗ +{growth}%
          </span>
        )}
        {growth < 0 && (
          <span className="text-sm font-semibold text-red-600">
            ↘ {growth}%
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">From last year</p>
    </div>
  );
}

interface ActivePostingsCardProps {
  total: number;
  internships: number;
  jobs: number;
}

function ActivePostingsCard({ total, internships, jobs }: ActivePostingsCardProps) {
  return (
    <div className="rounded-xl bg-blue-50 p-6 shadow-sm border border-blue-100">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Active Postings</h3>
        <Briefcase className="h-5 w-5 text-blue-600" />
      </div>
      <div className="text-3xl font-bold text-gray-900">{total}</div>
      <div className="flex gap-2 mt-3">
        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
          {internships} Internships
        </span>
        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
          {jobs} Jobs
        </span>
      </div>
    </div>
  );
}
