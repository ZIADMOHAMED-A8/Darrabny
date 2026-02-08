// app/company/report/_components/report-reflection.tsx
"use client";

import { Card } from "@/components/ui/card";
import { reportDummy } from "../_data/report.dummy";

export default function ReportReflection() {
  // Reflection card (static)

  const r = reportDummy.reflection;

  return (
    <Card className="overflow-hidden rounded-2xl border-0 bg-[#C1D2EE] text-[#001225] shadow-md">
      {/* Header strip */}
      <div className="flex items-center justify-between border-b border-black/15 px-6 py-4">
        <h3 className="text-lg font-semibold">Monthly Reflection & Activities</h3>
        <p className="text-xs text-[#001225]/60">{r.updated}</p>
      </div>

      <div className="space-y-6 px-6 py-5">
        {r.items.map((it, idx) => (
          <div key={it.title}>
            <p className="text-sm font-semibold">
              {idx + 1}. {it.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#001225]/80">{it.body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
