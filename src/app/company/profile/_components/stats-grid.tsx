import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, GraduationCap, PieChart, Star } from "lucide-react";
import { companyProfileDummy } from "../_data/company-profile.dummy";

function StatCard({
  title,
  value,
  helper,
  icon,
  circleClass,
  showProgress,
  progressValue,
  progressClass,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  circleClass: string;
  showProgress?: boolean;
  progressValue?: number;
  progressClass?: string;
}) {
  return (
    <Card className="h-full rounded-xl border border-black/10 bg-[var(--ic-surface)] shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
      <CardContent className="flex h-full flex-col justify-between p-4">
        {/* Title */}
        <p className="text-sm font-semibold text-slate-900">{title}</p>

        {/* Icon + Value */}
        <div className="mt-3 flex items-center justify-between">
          {/* Icon */}
          <div className="h-8 w-8">{icon}</div>

          {/* Circle value */}
          <div
            className={[
              "flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold shadow-[0_4px_8px_rgba(0,0,0,0.12)]",
              circleClass,
            ].join(" ")}
          >
            {value}
          </div>
        </div>

        {/* Helper */}
        <p className="mt-2 text-xs text-slate-500">{helper}</p>

        {/* Progress */}
        {showProgress && (
          <div className="mt-3">
            <div className="h-2 w-full rounded-full bg-black/20" />
            <div
              className={[
                "mt-[-8px] h-2 rounded-full",
                progressClass ?? "bg-[#0B73C6]",
              ].join(" ")}
              style={{ width: `${progressValue ?? 70}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function StatsGrid() {
  const s = companyProfileDummy.stats;

  return (
    <div className="grid grid-cols-2 gap-4 auto-rows-fr">
      <StatCard
        title="Active Internships"
        value={`${s.activeInternships}`}
        helper={`${s.newThisWeek} new this week`}
        icon={<TrendingUp className="h-8 w-8 text-emerald-600" />}
        circleClass="bg-emerald-400/90 text-emerald-950"
      />

      <StatCard
        title="Total Hired"
        value={`${s.totalHired}`}
        helper="Lifetime intern hires"
        icon={<GraduationCap className="h-8 w-8 text-violet-600" />}
        circleClass="bg-violet-600 text-white"
      />

      <StatCard
        title="Completion Rate"
        value={`${s.completionRate}%`}
        helper="Average completion"
        icon={<PieChart className="h-8 w-8 text-sky-600" />}
        circleClass="bg-[#0B73C6] text-white"
        showProgress
        progressValue={80}
        progressClass="bg-[#0B73C6]"
      />

      <StatCard
        title="Avg Rating"
        value={`${s.avgRating}`}
        helper={`Based on ${s.reviewsCount} reviews`}
        icon={
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-olive-700 shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
            <Star className="h-4 w-4 text-yellow-300" fill="currentColor" />
          </div>
        }
        circleClass="bg-lime-300 text-lime-950"
      />
    </div>
  );
}
