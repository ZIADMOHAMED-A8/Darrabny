// app/company/report/_components/report-attachments.tsx
"use client";

import { Card } from "@/components/ui/card";
import { FileText, Image as ImageIcon, FileSpreadsheet } from "lucide-react";
import { reportDummy } from "../_data/report.dummy";

function pickIcon(name: string) {
  // File icon helper

  if (name.endsWith(".png") || name.endsWith(".jpg")) return ImageIcon;
  if (name.endsWith(".xlsx") || name.endsWith(".csv")) return FileSpreadsheet;
  return FileText;
}

export default function ReportAttachments() {
  // Attachments list (static)

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-white">Attachments</h3>

      <div className="space-y-3">
        {reportDummy.attachments.map((a) => {
          const Icon = pickIcon(a.name);
          return (
            <Card
              key={a.name}
              className="rounded-2xl border-0 bg-[#C1D2EE] text-[#001225] shadow-md"
            >
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/50">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{a.name}</p>
                  <p className="text-xs text-[#001225]/70">
                    {a.size} | {a.age}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
