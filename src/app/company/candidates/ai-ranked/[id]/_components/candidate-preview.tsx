"use client";

import { Card, CardContent } from "@/components/ui/card";
import MatchAnalysisCard from "./match-analysis-card";
import RecentExperience from "./recent-experience";
import ActionButtons from "./action-buttons";

export default function CandidatePreview({
  name,
  headline,
  score,
  strengths,
  reviewNotes,
  recent,
}: {
  name: string;
  headline: string;
  score: number;
  strengths: string[];
  reviewNotes: string[];
  recent: { title: string; org: string; year: string }[];
}) {
  return (
    <aside className="w-[420px] shrink-0 bg-[rgba(207,226,255,0.55)] border-l border-black/10">
      <div className="px-8 py-10">
        <h2 className="text-center text-3xl font-semibold text-white/70 drop-shadow">
          Candidate Preview
        </h2>
        <div className="mx-auto mt-3 h-px w-72 bg-black/20" />

        <div className="mt-10 flex flex-col items-center">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-[#F0A7B5] text-white shadow-md">
            <span className="text-3xl font-semibold">
              {name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
            </span>
          </div>

          <p className="mt-6 text-xl font-semibold text-slate-900">{name}</p>
          <p className="mt-1 text-sm text-[#0B2E4F]">{headline}</p>
        </div>

        <div className="mt-8">
          <MatchAnalysisCard score={score} strengths={strengths} reviewNotes={reviewNotes} />
        </div>

        <div className="mt-8">
          <RecentExperience items={recent} />
        </div>

        <ActionButtons />
      </div>
    </aside>
  );
}
