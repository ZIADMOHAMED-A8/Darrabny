"use client";

import { useMemo, useState } from "react";
import RankedHeader from "./_components/ranked-header";
import CandidatesTable from "./_components/candidates-table";
import { useApplicationDetails } from "./hooks/use-application-details";
import { useApplicationStatus } from "./hooks/use-application-status";
import { useParams } from "next/navigation";

type ApplicationItem = {
  id: string;
  currentStatus: string;
  snapshot?: {
    studentName?: string;
    email?: string;
    skills?: string[];
  };
  aiAnalysis?: {
    score?: number;
    keyStrengths?: string[];
    areasForReview?: string[];
  };
};

export default function AiRankedApplicantsPage() {
  const { id } = useParams();
  const internshipId = Array.isArray(id) ? "" : id ?? "";

  const [activeId, setActiveId] = useState<string | null>(null);

  const { data, isLoading } = useApplicationDetails(internshipId);
  const { mutate: updateStatus, isPending } = useApplicationStatus(internshipId);

  // ✅ applications array
  const applications = useMemo(() => data?.Applications || [], [data?.Applications]);

  // ✅ table data
  const items = useMemo(() => {
    return (applications as ApplicationItem[]).map((app) => ({
      id: app.id,
      name: app.snapshot?.studentName,
      email: app.snapshot?.email,
      score: app.aiAnalysis?.score || 0,
      status: app.currentStatus,
      skills: app.snapshot?.skills || [],
    }));
  }, [applications]);

  // ✅ default selected candidate
  const selectedId =
    activeId || applications?.[0]?.id || "";

  // ✅ active application
  const activeApplication = useMemo(() => {
    return (applications as ApplicationItem[]).find(
      (app) => app.id === selectedId
    );
  }, [applications, selectedId]);

  // ✅ preview data
  const active = useMemo(() => {
    if (!activeApplication) return null;

    return {
      id: activeApplication.id,
      name:
        activeApplication.snapshot?.studentName ||
        "Unknown",
      headline:
        data?.internshipTitle || "Internship Candidate",
      score:
        activeApplication.aiAnalysis?.score || 0,
      strengths:
        activeApplication.aiAnalysis
          ?.keyStrengths || [],
      reviewNotes:
        activeApplication.aiAnalysis
          ?.areasForReview || [],
      recent:
        activeApplication.snapshot?.skills || [],
      status:
        activeApplication.currentStatus,
    };
  }, [activeApplication, data]);

  if (isLoading)
    return (
      <p className="p-10 text-white">
        Loading...
      </p>
    );

  if (!data)
    return (
      <p className="p-10 text-red-500">
        No Data
      </p>
    );
    // if(data.length===0){
    //   return(
    // <main className="min-h-screen bg-[#F5F7FB] text-slate-800">
    //   <div className="max-w-[1400px] mx-auto px-8 py-10">
    //   <RankedHeader />
    //   <div className="mt-10 flex gap-8 items-start">
    //   <div className="flex-1">

    //   )
    // }
  return (
    <main className="min-h-screen bg-[#F5F7FB] text-slate-800">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:px-8 md:py-10">
        {/* HEADER */}
        <RankedHeader />

        {/* LAYOUT */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start xl:gap-8">
          {/* LEFT - TABLE */}
          <div className="min-w-0">
            <CandidatesTable
              items={items}
              activeId={selectedId}
              onSelect={setActiveId}
            />
          </div>

          {/* RIGHT - PREVIEW */}
          <div className="w-full xl:w-[360px] xl:shrink-0">
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
                      .map((n: string) => n[0])
                      .join("")}
                  </div>

                  <p className="mt-3 font-semibold text-lg">
                    {active.name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {active.headline}
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
                      {active.strengths.map(
                        (s: string) => (
                          <li key={s}>
                            • {s}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* review */}
                  <div>
                    <p className="text-orange-500 text-xs font-semibold mb-1">
                      AREAS FOR REVIEW
                    </p>

                    <ul className="text-xs space-y-1">
                      {active.reviewNotes.map(
                        (r: string) => (
                          <li key={r}>
                            ⚠ {r}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* SKILLS */}
                <div className="mt-5">
                  <p className="text-sm font-semibold mb-2">
                    Skills
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {active.recent.map(
                      (skill: string) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-6 space-y-3">
                  <button
                    disabled={isPending}
                    onClick={() =>
                      updateStatus({
                        id: active.id,
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
                        id: active.id,
                        status: "accepted",
                      })
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    ✓ Accept
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
