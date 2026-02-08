// app/company/report/_components/report-placement-card.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { reportDummy } from "../_data/report.dummy";

export default function ReportPlacementCard() {
  // Placement info card (static)

  const p = reportDummy.placement;

  return (
    <Card className="rounded-2xl border-0 bg-[#C1D2EE] text-[#001225] shadow-md">
      <div className="p-5">
        {/* Title */}
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Placement Info</h3>
        </div>

        {/* Supervisor */}
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase text-[#001225]/70">
            Supervisor
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3A6AE] font-semibold text-white shadow">
              {p.supervisor.initials}
            </div>
            <p className="text-sm font-medium">{p.supervisor.name}</p>
          </div>
        </div>

        {/* Dates */}
        <div className="mt-4 grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase text-[#001225]/70">
              Start Date
            </p>
            <p className="mt-1 text-sm">{p.startDate}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-[#001225]/70">
              End Date
            </p>
            <p className="mt-1 text-sm">{p.endDate}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase text-[#001225]/70">
            Duration Progress
          </p>

          <div className="mt-2 h-2 w-full rounded-full bg-black/15">
            <div
              className="h-2 rounded-full bg-[#155DFC]"
              style={{ width: `${p.progress.pct}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-[#001225]/70">
            <span>{p.progress.fromLabel}</span>
            <span>{p.progress.toLabel}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
