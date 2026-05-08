"use client";

import { useMemo, useState } from "react";
import RankedHeader from "./_components/ranked-header";
import CandidatesTable from "./_components/candidates-table";
import CandidatePreview from "./_components/candidate-preview";

import { useApplicationDetails } from "./hooks/use-application-details";
import { useApplicationStatus } from "./hooks/use-application-status";

export default function AiRankedApplicantsPage() {
  const [activeId, setActiveId] = useState(
    "69ee27d887475ba91c328ce8"
  );

  const { data, isLoading } = useApplicationDetails(activeId);
  const { mutate: updateStatus, isPending } = useApplicationStatus();

  // ✅ table data
  const items = useMemo(() => {
    if (!data) return [];

    return [
      {
        id: data.id,
        name: data.snapshot.studentName,
        email: data.snapshot.email,
        score: data.aiAnalysis.score,
        status: data.currentStatus,
        skills: data.snapshot.skills || [],
      },
    ];
  }, [data]);

  // ✅ preview data
  const active = useMemo(() => {
    if (!data) return null;

    return {
      name: data.snapshot.studentName,
      headline: data.internshipId.internshipTittle,
      score: data.aiAnalysis.score,
      strengths: data.aiAnalysis.keyStrengths,
      reviewNotes: data.aiAnalysis.areasForReview,
      recent: data.snapshot.skills,
    };
  }, [data]);

  if (isLoading)
    return <p className="p-10 text-white">Loading...</p>;

  if (!data)
    return <p className="p-10 text-red-500">No Data</p>;

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-slate-800">
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        {/* HEADER */}
        <RankedHeader />

        {/* LAYOUT */}
        <div className="mt-10 flex gap-8 items-start">
          {/* LEFT - TABLE */}
          <div className="flex-1">
            <CandidatesTable
              items={items}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </div>

          {/* RIGHT - PREVIEW */}
          <div className="w-[360px] shrink-0">
            {active && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                {/* HEADER */}
                <h2 className="text-lg font-semibold text-center mb-6">
                  Candidate Preview
                </h2>

                {/* AVATAR */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-pink-300 flex items-center justify-center text-white text-xl font-bold">
                    {active.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <p className="mt-3 font-semibold text-lg">
                    {active.name}
                  </p>
                </div>

                {/* AI ANALYSIS */}
                <div className="mt-6 bg-gray-50 rounded-xl p-4 border">
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold text-sm text-blue-600">
                      AI MATCH ANALYSIS
                    </p>
                    <span className="font-bold text-blue-600">
                      {active.score}%
                    </span>
                  </div>

                  {/* strengths */}
                  <div className="mb-3">
                    <p className="text-green-600 text-xs font-semibold mb-1">
                      KEY STRENGTHS
                    </p>
                    <ul className="text-xs space-y-1">
                      {active.strengths.map((s: string) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* review */}
                  <div>
                    <p className="text-orange-500 text-xs font-semibold mb-1">
                      AREAS FOR REVIEW
                    </p>
                    <ul className="text-xs space-y-1">
                      {active.reviewNotes.map((r: string) => (
                        <li key={r}>⚠ {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-6 space-y-3">
                  <button
                    disabled={isPending}
                    onClick={() =>
                      updateStatus({
                        id: activeId,
                        status: "rejected",
                      })
                    }
                    className="w-full border border-red-500 text-red-500 py-2 rounded-lg font-medium hover:bg-red-50 transition"
                  >
                    ✕ Reject
                  </button>

                  <button
                    disabled={isPending}
                    onClick={() =>
                      updateStatus({
                        id: activeId,
                        status: "accepted",
                      })
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    ✓ Accept
                  </button>

                  <button className="w-full border py-2 rounded-lg text-blue-600 font-medium">
                    Message Candidate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}