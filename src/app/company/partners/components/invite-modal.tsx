"use client";

import { useState, useRef, useEffect } from "react";
import { useCompanyInternships } from "../hooks/use-company-internships";
import { useSendInvite } from "../hooks/use-send-invite";

const ICONS: Record<number, JSX.Element> = {
  0: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  1: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  2: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  3: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

export default function InviteModal({
  universityId,
  onClose,
}: {
  universityId: string;
  onClose: () => void;
}) {
  const { data, isLoading: loadingInternships, error: fetchError } = useCompanyInternships();
  const { mutate, isPending, isError, error: sendError, isSuccess } = useSendInvite();

  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [validationError, setValidationError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = data?.find((i: any) => i._id === selected);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSend = () => {
    if (!selected) {
      setValidationError("Please select an internship before sending.");
      return;
    }
    setValidationError("");
    mutate({ internshipId: selected, universityId: universityId });
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#fff", borderRadius: 16, width: 440, padding: "32px 28px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)", position: "relative",
      }}>
        {/* Header */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>
          Send Partnership Request
        </h2>
        <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 20px" }}>
          Select an internship to offer to this university.
        </p>

        {/* Fetch error */}
        {fetchError && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <span style={{ fontSize: 13, color: "#DC2626" }}>Failed to load internships. Please try again.</span>
          </div>
        )}

        {/* Custom Dropdown */}
        <div ref={dropdownRef} style={{ position: "relative", marginBottom: validationError || isError ? 8 : 24 }}>
          <button
            type="button"
            onClick={() => !loadingInternships && !fetchError && setIsOpen((o) => !o)}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "11px 14px", border: `1.5px solid ${isOpen ? "#1D4ED8" : validationError ? "#DC2626" : "#D1D5DB"}`,
              borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14,
              color: selected ? "#111827" : "#9CA3AF", outline: "none",
              boxShadow: isOpen ? "0 0 0 3px rgba(29,78,216,0.1)" : "none",
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {selectedItem ? (
                <>
                  <span style={{ color: "#6B7280" }}>{ICONS[data?.indexOf(selectedItem) % 4 ?? 0]}</span>
                  {selectedItem.internshipTittle}
                </>
              ) : loadingInternships ? "Loading internships…" : "Choose Internship"}
            </span>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {isOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
              background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100, overflow: "hidden",
            }}>
              {data?.length === 0 ? (
                <div style={{ padding: "16px 14px", fontSize: 13, color: "#6B7280", textAlign: "center" }}>
                  No internships available.
                </div>
              ) : (
                data?.map((i: any, idx: number) => (
                  <div
                    key={i._id}
                    onClick={() => { setSelected(i._id); setIsOpen(false); setValidationError(""); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "12px 14px", cursor: "pointer", fontSize: 14, color: "#111827",
                      background: selected === i._id ? "#EFF6FF" : "transparent",
                      borderBottom: idx < (data?.length ?? 0) - 1 ? "1px solid #F3F4F6" : "none",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => { if (selected !== i._id) (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = selected === i._id ? "#EFF6FF" : "transparent"; }}
                  >
                    <span style={{ color: "#6B7280", flexShrink: 0 }}>{ICONS[idx % 4]}</span>
                    {i.internshipTittle}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Validation error */}
        {validationError && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <span style={{ fontSize: 12, color: "#DC2626" }}>{validationError}</span>
          </div>
        )}

        {/* Send error */}
        {isError && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <span style={{ fontSize: 13, color: "#DC2626" }}>
              {(sendError as any)?.message || "Failed to send request. Please try again."}
            </span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "11px 0", border: "1.5px solid #E5E7EB", borderRadius: 10,
              background: "#fff", fontSize: 14, fontWeight: 500, color: "#374151",
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isPending}
            style={{
              flex: 1, padding: "11px 0", border: "none", borderRadius: 10,
              background: isPending ? "#93C5FD" : "#1D4ED8", fontSize: 14, fontWeight: 600,
              color: "#fff", cursor: isPending ? "not-allowed" : "pointer",
              transition: "background 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            {isPending ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Sending…
              </>
            ) : "Send Request"}
          </button>
        </div>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}