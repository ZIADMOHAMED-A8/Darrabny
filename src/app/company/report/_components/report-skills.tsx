// app/company/report/_components/report-skills.tsx
"use client";

import { Card } from "@/components/ui/card";
import { reportDummy } from "../_data/report.dummy";

export default function ReportSkills() {
  // Skills bars (static)

  return (
    <Card className="rounded-2xl border-0 bg-[#AFC3E6] text-[#001225] shadow-md">
      <div className="border-b border-black/15 px-6 py-4">
        <h3 className="text-lg font-semibold">Self-Assessment Skills</h3>
      </div>

      <div className="grid gap-6 px-6 py-5 md:grid-cols-2">
        {reportDummy.skills.map((s) => (
          <div key={s.label} className="flex items-center gap-4">
            <p className="w-36 text-sm font-medium">{s.label}</p>

            <div className="h-2 flex-1 rounded-full bg-black/20">
              <div
                className="h-2 rounded-full bg-[#155DFC]"
                style={{ width: `${s.pct}%` }}
              />
            </div>

            <p className="w-10 text-right text-sm font-semibold">{s.pct}%</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
