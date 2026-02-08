"use client";

import { useMemo, useState } from "react";
import RankedHeader from "./_components/ranked-header";
import CandidatesTable from "./_components/candidates-table";
import CandidatePreview from "./_components/candidate-preview";
import { aiRankedDummy } from "./_data/ai-ranked.dummy";

export default function AiRankedApplicantsPage() {
  const items = aiRankedDummy.candidates;

  const [activeId, setActiveId] = useState(items[1]?.id ?? items[0].id);

  const active = useMemo(
    () => items.find((x) => x.id === activeId) ?? items[0],
    [activeId, items]
  );

  return (
    <main className="min-h-screen bg-[var(--ic-bg)] text-white">
      <div className="flex min-h-screen">
        {/* LEFT */}
        <div className="flex-1 px-10 pb-16 pt-10">
          <RankedHeader />

          <div className="mt-10">
            <CandidatesTable items={items} activeId={activeId} onSelect={setActiveId} />
          </div>
        </div>

        {/* RIGHT */}
        <CandidatePreview
          name={active.preview.name}
          headline={active.preview.headline}
          score={active.preview.matchScore}
          strengths={active.preview.strengths}
          reviewNotes={active.preview.reviewNotes}
          recent={active.preview.recentExperience}
        />
      </div>
    </main>
  );
}
