"use client";

import { Card, CardContent } from "@/components/ui/card";
import RingScore from "./ring-score";
import { AiCandidate } from "../_data/ai-ranked.dummy";

export default function CandidatesTable({
  items,
  activeId,
  onSelect,
}: {
  items: AiCandidate[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] shadow-md">
      <CardContent className="p-0 overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[220px_1fr_220px_120px] gap-4 px-6 py-4 text-sm font-semibold text-[#0B2E4F]">
          <div>Title</div>
          <div>University</div>
          <div>Skills</div>
          <div className="text-center">AI Filter</div>
        </div>

        <div className="h-px bg-black/10" />

        {/* Rows */}
        <div className="divide-y divide-black/10">
          {items.map((c) => {
            const active = c.id === activeId;

            return (
              <button
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={[
                  "w-full text-left",
                  "grid grid-cols-[220px_1fr_220px_120px] gap-4 px-6 py-4",
                  active ? "bg-white/20" : "hover:bg-white/10",
                ].join(" ")}
              >
                {/* Title */}
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#F0A7B5] text-white shadow-md">
                    <span className="font-semibold">{c.initials}</span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-700">{c.email}</p>
                  </div>
                </div>

                {/* Uni */}
                <div className="flex items-center">
                  <p className="text-sm text-slate-900">{c.university}</p>
                </div>

                {/* Skills */}
                <div className="flex items-center gap-2">
                  {c.skills.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-white/40 px-3 py-1 text-xs text-slate-800 border border-black/10"
                    >
                      {s}
                    </span>
                  ))}
                  {(c.moreSkillsCount ?? 0) > 0 && (
                    <span className="rounded-full bg-white/40 px-3 py-1 text-xs text-slate-800 border border-black/10">
                      +{c.moreSkillsCount}
                    </span>
                  )}
                </div>

                {/* Score */}
                <div className="flex items-center justify-center">
                  <RingScore value={c.score} />
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
