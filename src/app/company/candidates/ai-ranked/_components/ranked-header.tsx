"use client";

import { ChevronLeft } from "lucide-react";
import { aiRankedDummy } from "../_data/ai-ranked.dummy";

export default function RankedHeader() {
  return (
    <div className="flex items-start gap-4">
      <button className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90">
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div>
        <h1 className="text-3xl font-semibold text-white">{aiRankedDummy.title}</h1>
        <p className="mt-2 text-sm text-white/70">{aiRankedDummy.subtitle}</p>
      </div>
    </div>
  );
}
