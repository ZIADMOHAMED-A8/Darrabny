"use client";

import { useState } from "react";
import InternshipProgressCard from "./_components/InternshipProgressCard";
import useGetMyInternships from "@/app/student/internships/hooks/useGetMyInternships";
type Tab = "in-progress" | "completed";

type MyInternshipItem = {
  id: string;
  title?: string;
  location?: string;
  progress?: number;
  status?: string;
  company?: {
    name?: string;
  };
  currentWeek?: number;
  totalWeeks?: number;
};

export default function InternshipsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("in-progress");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error, isFetching } = useGetMyInternships({
    page,
    limit,
    status: activeTab,
  });
  const { data: inProgressData } = useGetMyInternships({
    page: 1,
    limit: 1,
    status: "in-progress",
  });
  const { data: completedData } = useGetMyInternships({
    page: 1,
    limit: 1,
    status: "completed",
  });

  const rawItems = (data?.data as MyInternshipItem[]) ?? [];

  const filteredInternships = rawItems.map((item) => ({
    id: item.id,
    title: item.title ?? "Untitled Internship",
    company: item.company?.name ?? "Unknown Company",
    mode: item.location ?? "N/A",
    progress: Number(item.progress ?? 0),
    week:
      item.currentWeek && item.totalWeeks
        ? `Week ${item.currentWeek} / ${item.totalWeeks}`
        : "No timeline",
    status:
      normalizeStatus(item.status) === "completed" ? "completed" : "in-progress",
  }));

  const total = Number(data?.meta?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const inProgressCount = Number(inProgressData?.meta?.total ?? 0);
  const completedCount = Number(completedData?.meta?.total ?? 0);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Internships</h1>
        <p className="text-gray-600 mt-1">
          Track your active progress and view your professional history.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2">
        <button
          onClick={() => {
            setActiveTab("in-progress");
            setPage(1);
          }}
          className={`pb-2 ${
            activeTab === "in-progress"
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-400"
          }`}
        >
          In Progress ({inProgressCount})
        </button>

        <button
          onClick={() => {
            setActiveTab("completed");
            setPage(1);
          }}
          className={`pb-2 ${
            activeTab === "completed"
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-400"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {isLoading && <p className="text-gray-500 text-sm">Loading internships...</p>}

        {isError && (
          <p className="text-red-600 text-sm">
            {(error as Error)?.message || "Failed to load internships."}
          </p>
        )}

        {filteredInternships.map((item) => (
          <InternshipProgressCard
            key={item.id}
            {...item}
          />
        ))}

        {filteredInternships.length === 0 && (
          <p className="text-gray-500 text-sm">
            No internships found.
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>{isFetching ? "Refreshing..." : `Page ${page} of ${totalPages}`}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
            className="rounded-md border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || isLoading}
            className="rounded-md border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

function normalizeStatus(status?: string) {
  if (!status) return "in-progress";
  if (status === "inProgress" || status === "in_progress") return "in-progress";
  return status;
}
