"use client";

import { useMemo, useState, type ReactNode } from "react";
import useGetMyInternships from "@/app/student/internships/hooks/useGetMyInternships";
import InternshipProgressCard from "./_components/InternshipProgressCard";

type Tab = "in-progress" | "completed";

type MyInternshipItem = {
  id: string;
  title?: string;
  status?: string;
  thumbnail?: string;
  company?: { name?: string };
  report?: {
    id?: string;
    title?: string;
    status?: string;
    overallRating?: number;
    createdAt?: string;
  };
  certificate?: { url?: string };
};

export default function InternshipsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("in-progress");
  const { data, isLoading, isError, error, isFetching } = useGetMyInternships({
    page: 1,
    limit: 100,
  });

  const internships = useMemo(() => {
    const items = (data?.data as MyInternshipItem[] | undefined) ?? [];

    return items.map((item) => ({
      id: item.id,
      title: item.title ?? "Untitled Internship",
      company: item.company?.name ?? "Unknown Company",
      thumbnail: item.thumbnail || "/home/featured-internships/Img-1.png",
      status: normalizeStatus(item.status),
      report: item.report,
      certificateUrl: item.certificate?.url,
    }));
  }, [data]);

  const filteredInternships = internships.filter(
    (internship) => internship.status === activeTab,
  );
  const inProgressCount = internships.filter(
    (internship) => internship.status === "in-progress",
  ).length;
  const completedCount = internships.filter(
    (internship) => internship.status === "completed",
  ).length;

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">My Internships</h1>
        <p className="mt-1 text-gray-600">
          Track your active progress and view your professional history.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto border-b pb-2 sm:gap-6">
        <TabButton
          active={activeTab === "in-progress"}
          onClick={() => setActiveTab("in-progress")}
        >
          In Progress ({inProgressCount})
        </TabButton>
        <TabButton
          active={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        >
          Completed ({completedCount})
        </TabButton>
      </div>

      <div className="space-y-6">
        {isLoading && <p className="text-sm text-gray-500">Loading internships...</p>}
        {isError && (
          <p className="text-sm text-red-600">
            {(error as Error)?.message || "Failed to load internships."}
          </p>
        )}
        {filteredInternships.map((internship) => (
          <InternshipProgressCard key={internship.id} {...internship} />
        ))}
        {!isLoading && !isError && filteredInternships.length === 0 && (
          <p className="text-sm text-gray-500">No internships found.</p>
        )}
        {isFetching && !isLoading && (
          <p className="text-sm text-gray-500">Refreshing...</p>
        )}
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 pb-2 ${
        active
          ? "border-b-2 border-blue-600 font-medium text-blue-600"
          : "text-gray-400"
      }`}
    >
      {children}
    </button>
  );
}

function normalizeStatus(status?: string): Tab {
  const normalized = status?.toLowerCase().replace(/[_\s]/g, "-");
  return normalized === "completed" ? "completed" : "in-progress";
}
