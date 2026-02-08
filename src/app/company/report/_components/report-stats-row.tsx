// app/company/report/_components/report-stats-row.tsx
"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, CalendarDays, BarChart3 } from "lucide-react";
import { reportDummy } from "../_data/report.dummy";

function toneClass(tone: "green" | "gray" | "blue") {
  // Chip color helper

  if (tone === "green") return "bg-[#5ED08E] text-[#0B2A18]";
  if (tone === "blue") return "bg-[#7EB6E3] text-[#001225]";
  return "bg-white/70 text-[#001225]";
}

export default function ReportStatsRow() {
  // Top stats row (static)

  const icons = [CheckCircle2, CalendarDays, BarChart3];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {reportDummy.stats.map((s, idx) => {
        const Icon = icons[idx] ?? BarChart3;

        return (
          <Card
            key={s.label}
            className="rounded-2xl border-0 bg-[#C1D2EE] text-[#001225] shadow-md"
          >
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Icon className="h-4 w-4" />
                <span>{s.label}</span>
              </div>

              <div className="mt-3 text-2xl font-semibold">{s.value}</div>

              <div
                className={`mt-3 inline-flex rounded-lg px-3 py-1 text-xs ${toneClass(
                  s.chipTone
                )}`}
              >
                {s.chip}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
