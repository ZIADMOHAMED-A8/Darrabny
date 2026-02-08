// app/company/report/_components/report-header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Download, CheckCircle2 } from "lucide-react";
import { reportDummy } from "../_data/report.dummy";

export default function ReportHeader() {
  // Page header (static)

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-3">
        {/* Back button */}
        <button className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90">
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div>
          {/* Title row */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-white md:text-3xl">
              {reportDummy.title}
            </h1>

            <Badge className="rounded-full bg-[#6C7A16] text-white hover:bg-[#6C7A16]">
              {reportDummy.status}
            </Badge>
          </div>

          {/* Subtitle */}
          <p className="mt-1 text-sm text-white/70">{reportDummy.meta}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          className="rounded-xl bg-white text-slate-900 hover:bg-white/90"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>

        <Button className="rounded-xl bg-[#0A6FB8] text-white hover:bg-[#095F9E]">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Approve Report
        </Button>
      </div>
    </div>
  );
}
