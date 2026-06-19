"use client";

import { useState } from "react";
import { useUniversities } from "./hooks/use-universities";
import UniversitiesTable from "./components/universities-table";
import InviteModal from "./components/invite-modal";
export default function UniversityPartnersPage() {
  const { data, isLoading, error } = useUniversities();
  const [selectedUni, setSelectedUni] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#F3F4F6] px-4 py-6 sm:px-6 md:px-8">

      {/* Page content */}
      <div className="mx-auto max-w-[1100px] pt-4 sm:pt-10 md:pt-[76px]">
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center gap-3">
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
          partnerUniversityIds={data.partnerUniversityIds}
            universityId={selectedUni}
            onClose={() => setSelectedUni(null)}
          />
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
