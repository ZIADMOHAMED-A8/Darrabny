// app/company/report/_components/report-intern-card.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Mail } from "lucide-react";
import { reportDummy } from "../_data/report.dummy";

export default function ReportInternCard() {
  // Intern info card (static)

  const i = reportDummy.intern;

  return (
    <Card className="overflow-hidden rounded-2xl border-0 bg-[#C1D2EE] text-[#001225] shadow-md">
      {/* Top dark strip */}
      <div className="h-16 bg-[#001225]" />

      <div className="p-5">
        {/* Avatar */}
        <div className="-mt-10 flex items-center justify-start">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#001225] text-white shadow">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>

        {/* Name */}
        <h3 className="mt-3 text-lg font-semibold">{i.name}</h3>
        <p className="text-sm text-[#001225]/80">{i.role}</p>

        <div className="my-4 h-px bg-black/25" />

        {/* University */}
        <div className="flex items-start gap-3">
          <GraduationCap className="mt-0.5 h-5 w-5 text-[#001225]/80" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide">
              University
            </p>
            <p className="text-sm text-[#001225]/80">{i.university}</p>
          </div>
        </div>

        {/* Major */}
        <div className="mt-4 flex items-start gap-3">
          <BookOpen className="mt-0.5 h-5 w-5 text-[#001225]/80" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide">Major</p>
            <p className="text-sm text-[#001225]/80">{i.major}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 flex-1 rounded-xl border-[#001225]/50 bg-transparent text-[#001225] hover:bg-white/30"
          >
            View Profile
          </Button>

          <button className="inline-flex h-10 w-12 items-center justify-center rounded-xl border border-[#001225]/50 bg-transparent hover:bg-white/30">
            <Mail className="h-5 w-5 text-[#001225]" />
          </button>
        </div>
      </div>
    </Card>
  );
}
