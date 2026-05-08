"use client";

import { useState } from "react";
import { ApplicationTab } from "@/data/applications";
import ApplicationCard from "./components/ApplicationCard";
import useGetMyApplications from "@/app/student/applications/hooks/useGetMyApplications";
type ApplicationResponseItem = {
  id: string;
  internship?: {
    title?: string;
    company?: {
      name?: string;
    };
  };
  timeline?: Array<{
    status: string;
    date?: string;
  }>;
};

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<ApplicationTab>("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error, isFetching } = useGetMyApplications({
    page,
    limit,
    status: activeTab,
  });

  const mappedApplications = ((data?.applications as ApplicationResponseItem[]) ?? []).map(
    (app) => ({
      id: app.id,
      title: app.internship?.title ?? "Untitled Internship",
      company: app.internship?.company?.name ?? "Unknown Company",
      steps: (app.timeline ?? []).map((step) => ({
        label: getStepLabel(step.status),
        status: normalizeApplicationStatus(step.status),
        date: formatDate(step.date),
      })),
    }),
  );

  const totalPages = Number(data?.pages || 1);

  const tabs: { key: ApplicationTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "closed", label: "Closed" },
    { key: "under-review", label: "Under Review" },
  ];

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setPage(1);
            }}
            className={`pb-2 ${
              activeTab === tab.key
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {isLoading && <p className="text-sm text-gray-500">Loading applications...</p>}

        {isError && (
          <p className="text-sm text-red-600">
            {(error as Error)?.message || "Failed to load applications."}
          </p>
        )}

        {mappedApplications.map((app) => (
          <ApplicationCard key={app.id} {...app} />
        ))}

        {!isLoading && !isError && mappedApplications.length === 0 && (
          <p className="text-sm text-gray-500">No applications found.</p>
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

function normalizeApplicationStatus(status: string) {
  if (status === "inconsideration") return "under-review";
  if (status === "in-progress") return "under-review";
  return status;
}

function getStepLabel(status: string) {
  const normalized = normalizeApplicationStatus(status);

  if (normalized === "applied") return "Applied";
  if (normalized === "under-review") return "Under Review";
  if (normalized === "accepted") return "Accepted";
  if (normalized === "rejected") return "Rejected";

  return "Update";
}

function formatDate(date?: string) {
  if (!date) return "";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
