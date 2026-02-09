"use client";

import { useState } from "react";
import { applications } from "@/data/applications";

import { ApplicationTab } from "@/data/applications";
import ApplicationCard from "./components/ApplicationCard";

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<ApplicationTab>("all");

  const filtered = applications.filter((app) => {
    const finalStatus = app.steps.at(-1)?.status;

    if (activeTab === "all") return true;
    if (activeTab === "active")
      return finalStatus === "accepted" || finalStatus === "under-review";
    if (activeTab === "closed")
      return finalStatus === "rejected";
    if (activeTab === "under-review")
      return finalStatus === "under-review";

    return true;
  });

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
            onClick={() => setActiveTab(tab.key)}
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
        {filtered.map((app) => (
          <ApplicationCard key={app.id} {...app} />
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">
            No applications found.
          </p>
        )}
      </div>
    </section>
  );
}
