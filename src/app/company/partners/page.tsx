"use client";

import { useState } from "react";
import { useUniversities } from "./hooks/use-universities";
import UniversitiesTable from "./components/universities-table";
import InviteModal from "./components/invite-modal";
import StudentTopBar from "@/app/_components/StudentTopBar";
export default function UniversityPartnersPage() {
  const { data, isLoading, error } = useUniversities();
  const [selectedUni, setSelectedUni] = useState<string | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: "#F3F4F6", padding: "32px" }}>

      {/* Page content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 76 }}>
        {isLoading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, gap: 12 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <span style={{ fontSize: 14, color: "#6B7280" }}>Loading universities…</span>
          </div>
        ) : (
          <UniversitiesTable
            data={data ?? []}
            onInvite={(id: string) => setSelectedUni(id)}
            error={error as Error | null}
          />
        )}

        {selectedUni && (
          <InviteModal
            universityId={selectedUni}
            onClose={() => setSelectedUni(null)}
          />
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}