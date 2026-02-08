"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Plus, Atom } from "lucide-react";
import { universityHubDummy } from "../_data/university-hub.dummy";

export default function HubHeader() {
  // Page header (static)

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-3">
        {/* Back icon */}
        <button className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90">
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div>
          {/* Title */}
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-white md:text-3xl">
            <Atom className="h-7 w-7 text-white/80" />
            {universityHubDummy.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-1 text-sm text-white/70">
            {universityHubDummy.subtitle}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          className="bg-white text-slate-900 hover:bg-white/90"
        >
          <Download className="mr-2 h-4 w-4" />
          Report
        </Button>

        <Button className="bg-[#0474C4] text-white hover:bg-[#0363A8] transition-colors duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Add Report
        </Button>
      </div>
    </div>
  );
}
