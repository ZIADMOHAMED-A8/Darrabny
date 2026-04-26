"use client";

import { useState } from "react";
import InternshipProgressCard from "./_components/InternshipProgressCard";
import { StudentInternships } from "@/data/studentInterships";

type Tab = "in-progress" | "completed";

export default function InternshipsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("in-progress");

  const filteredInternships = StudentInternships.filter(
    (item) => item.status === activeTab
  );

  const inProgressCount = StudentInternships.filter(
    (i) => i.status === "in-progress"
  ).length;

  const completedCount = StudentInternships.filter(
    (i) => i.status === "completed"
  ).length;

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
          onClick={() => setActiveTab("in-progress")}
          className={`pb-2 ${
            activeTab === "in-progress"
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-400"
          }`}
        >
          In Progress ({inProgressCount})
        </button>

        <button
          onClick={() => setActiveTab("completed")}
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
    </section>
  );
}
