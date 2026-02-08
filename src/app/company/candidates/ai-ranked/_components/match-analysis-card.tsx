"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function MatchAnalysisCard({
  score,
  strengths,
  reviewNotes,
}: {
  score: number;
  strengths: string[];
  reviewNotes: string[];
}) {
  return (
    <Card className="rounded-2xl border-0 bg-white/30 shadow-md">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/40 border border-black/10">
              <Briefcase className="h-5 w-5 text-slate-900" />
            </div>
            <p className="text-sm font-semibold text-[#0B4A7A]">AI MATCH ANALYSIS</p>
          </div>

          <p className="text-sm font-semibold text-[#0B4A7A]">{score}%</p>
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold text-emerald-600">KEY STRENGTHS</p>
          <ul className="mt-2 space-y-2 text-sm text-slate-800 list-disc pl-5">
            {strengths.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xs font-bold text-amber-500">AREAS FOR REVIEW</p>
          <ul className="mt-2 space-y-2 text-sm text-slate-800">
            {reviewNotes.map((x, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5">⚠️</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
