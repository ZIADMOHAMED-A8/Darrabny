"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  Briefcase,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  RefreshCcw,
  ClipboardList,
} from "lucide-react";
import useGetPendingEndorsements from "./hooks/useGetPendingEndorsements";
import useRespondToEndorsementRequest from "./hooks/useRespondToEndorsementRequest";
import { useRouter } from "next/navigation";
// ─── Types ────────────────────────────────────────────────────────────────────

type InternshipStatus = "Active" | "Closed" | "Starting soon";

interface Internship {
  id: string;
  company: string;
  title: string;
  status: InternshipStatus;
  location: string;
  type: string;
  duration: string;
  image: string;
  internshipId: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function asObject(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function getNested(obj: unknown, key: string): unknown {
  const rec = asObject(obj);
  return rec ? rec[key] : undefined;
}

function mapEndorsementToInternship(raw: unknown, idx: number): Internship {
  const id =
    asString(getNested(raw, "_id")) ??
    asString(getNested(raw, "id")) ??
    String(idx);

  // Support both direct fields and nested internshipId object
  const internshipObj = getNested(raw, "internshipId");
  const internshipId =
    asString(getNested(internshipObj, "_id")) ??
    asString(getNested(internshipObj, "id")) ??
    asString(getNested(raw, "internshipId")) ??
    id;

  const title =
    asString(getNested(internshipObj, "internshipTittle")) ??
    asString(getNested(internshipObj, "internshipTitle")) ??
    asString(getNested(raw, "internshipTitle")) ??
    asString(getNested(raw, "internshipTittle")) ??
    "Endorsement Request";

  const company =
    asString(getNested(getNested(raw, "companyId"), "companyName")) ??
    asString(getNested(getNested(raw, "company"), "companyName")) ??
    asString(getNested(getNested(raw, "company"), "name")) ??
    asString(getNested(raw, "companyName")) ??
    "Company";

  const location =
    asString(getNested(internshipObj, "internshipLocation")) ??
    asString(getNested(raw, "location")) ??
    "—";

  const type =
    asString(getNested(internshipObj, "workingTime")) ??
    asString(getNested(raw, "type")) ??
    "—";

  const duration = (() => {
    const months = getNested(internshipObj, "durationInMonths");
    if (typeof months === "number") return `${months} months`;
    return asString(getNested(raw, "duration")) ?? "—";
  })();

  const rawStatus = asString(getNested(internshipObj, "status")) ?? "";
  const status: InternshipStatus =
    rawStatus === "closed"
      ? "Closed"
      : rawStatus === "onboarding" || rawStatus === "active"
      ? "Active"
      : rawStatus === "starting soon"
      ? "Starting soon"
      : "Active";

  const image =
    asString(getNested(internshipObj, "thumbnail")) ??
    asString(getNested(raw, "image")) ??
    asString(getNested(raw, "thumbnail")) ??
    "";

  return {
    id,
    internshipId,
    company,
    title,
    status,
    location,
    type,
    duration,
    image,
  };
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: InternshipStatus }) {
  const styles: Record<InternshipStatus, React.CSSProperties> = {
    Active: { background: "#e6f4ea", color: "#1e7e34", border: "1px solid #c3e6cb" },
    Closed: { background: "#fdecea", color: "#c0392b", border: "1px solid #f5c6cb" },
    "Starting soon": { background: "#fff8e1", color: "#b8860b", border: "1px solid #ffe082" },
  };
  return (
    <span style={{
      ...styles[status],
      borderRadius: 20,
      padding: "2px 12px",
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: "nowrap",
      flexShrink: 0,
    }}>
      {status}
    </span>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 16,
      borderRadius: 16, border: "1px solid #e2e8f0", background: "#fff",
      padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}>
      <div style={{ width: 88, height: 88, borderRadius: 12, background: "#e2e8f0", flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
        <div style={{ height: 12, width: "33%", borderRadius: 6, background: "#e2e8f0" }} />
        <div style={{ height: 16, width: "66%", borderRadius: 6, background: "#e2e8f0" }} />
        <div style={{ height: 12, width: "50%", borderRadius: 6, background: "#e2e8f0" }} />
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ height: 28, width: 96, borderRadius: 8, background: "#e2e8f0" }} />
          <div style={{ height: 28, width: 28, borderRadius: "50%", background: "#e2e8f0" }} />
          <div style={{ height: 28, width: 28, borderRadius: "50%", background: "#e2e8f0" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Internship card ──────────────────────────────────────────────────────────

function InternshipCard({
  item,
  onApprove,
  onReject,
  busy,
}: {
  item: Internship;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  busy?: boolean;
}) {
  const router = useRouter();

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 16,
      borderRadius: 16, border: "1px solid #e2e8f0", background: "#fff",
      padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}
    >
      {/* Thumbnail */}
      <div style={{ width: 88, height: 88, borderRadius: 12, overflow: "hidden", background: "#eef2fb", flexShrink: 0 }}>
        {item.image ? (
          <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Briefcase size={28} color="#94a3b8" />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#64748b", margin: 0 }}>{item.company}</p>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "2px 0 0", lineHeight: 1.3 }}>
              {item.title}
            </h3>
          </div>
          <StatusBadge status={item.status} />
        </div>

        {/* Meta */}
        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 12px", fontSize: 12, color: "#64748b" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={12} /> {item.location}
          </span>
          <span style={{ color: "#cbd5e1" }}>·</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Briefcase size={12} /> {item.type}
          </span>
          <span style={{ color: "#cbd5e1" }}>·</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={12} /> {item.duration}
          </span>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <button
          onClick={() => {
            router.push(
              `/university/internships/${item.internshipId}?endorsementId=${item.id}`
            );
          }}
          style={{
            background: "#1565C0", color: "#fff", border: "none",
            borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            View Details
          </button>
          <button
            type="button"
            onClick={() => onReject(item.id)}
            disabled={busy}
            title="Reject"
            style={{
              width: 28, height: 28, display: "grid", placeItems: "center",
              borderRadius: "50%", border: "1px solid #e2e8f0",
              background: "#fff", cursor: busy ? "not-allowed" : "pointer",
              color: "#94a3b8", opacity: busy ? 0.5 : 1, transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "#fca5a5"; el.style.color = "#f87171"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "#e2e8f0"; el.style.color = "#94a3b8"; }}
          >
            <X size={13} />
          </button>
          <button
            type="button"
            onClick={() => onApprove(item.id)}
            disabled={busy}
            title="Approve"
            style={{
              width: 28, height: 28, display: "grid", placeItems: "center",
              borderRadius: "50%", border: "1px solid #e2e8f0",
              background: "#fff", cursor: busy ? "not-allowed" : "pointer",
              color: "#94a3b8", opacity: busy ? 0.5 : 1, transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "#86efac"; el.style.color = "#22c55e"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "#e2e8f0"; el.style.color = "#94a3b8"; }}
          >
            <Check size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  const pages: (number | "…")[] = [1, 2, 3, "…", 10];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        style={{
          display: "flex", alignItems: "center", gap: 4, padding: "6px 12px",
          borderRadius: 8, border: "none", background: "transparent",
          fontSize: 12, fontWeight: 500, color: "#475569",
          cursor: current === 1 ? "not-allowed" : "pointer", opacity: current === 1 ? 0.4 : 1,
        }}
      >
        <ChevronLeft size={14} /> Previous
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={i} style={{ padding: "0 4px", fontSize: 14, color: "#94a3b8" }}>…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            style={{
              width: 32, height: 32, borderRadius: 8, border: "none",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              background: current === p ? "#0f172a" : "transparent",
              color: current === p ? "#fff" : "#475569",
            }}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        style={{
          display: "flex", alignItems: "center", gap: 4, padding: "6px 12px",
          borderRadius: 8, border: "none", background: "transparent",
          fontSize: 12, fontWeight: 500, color: "#475569",
          cursor: current === total ? "not-allowed" : "pointer", opacity: current === total ? 0.4 : 1,
        }}
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InternshipListingsPage() {
  const { endorsements, isLoading, isError, error, refetch, isFetching } =
    useGetPendingEndorsements();
  const respondMutation = useRespondToEndorsementRequest();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const dummy= {
  //   _id: "69ed51a85f872ad9fe513a23",
  //   internshipTittle: "Frontend Developer Intern 2",
  //   internshipLocation: "remote",
  //   workingTime: "full-time",
  //   internshipDescription:
  //     "Internship focused on building modern web applications",
  //   technicalSkills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  //   softSkills: ["Teamwork", "Problem-solving", "Communication"],
  //   status: "onboarding",
  //   startDate: "2026-04-01T00:00:00.000Z",
  //   durationInMonths: 3,
  //   thumbnail: null,
  //   closed: false,
  //   companyId: {
  //     _id: "69d3b16f874301a670b5b629",
  //     companyName: "tecH 2",
  //   },
  //   endDate: "2026-06-30T23:00:00.000Z",
  //   createdAt: "2026-04-25T23:43:36.667Z",
  //   updatedAt: "2026-04-27T13:14:18.728Z",
  //   __v: 0,
  //   updatedBy: "69d3b16f874301a670b5b629",
  //   matchScore: 0.19,
  //   matchedSkills: [],
  //   why: "Recently added internship",
  // }
  //  endorsements=[...endorsements,dummy]
  const internships = useMemo(
    () => endorsements.map(mapEndorsementToInternship),
    [endorsements]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return internships;
    const text = search.toLowerCase();
    return internships.filter(
      (i) => i.title.toLowerCase().includes(text) || i.company.toLowerCase().includes(text)
    );
  }, [internships, search]);

  async function respondTo(id: string, decision: "approved" | "rejected") {
    try {
      setBusyId(id);
      await respondMutation.mutateAsync({ id, decision });
    } finally {
      setBusyId(null);
    }
  }

  // ── Content ─────────────────────────────────────────────────────────────────

  function renderContent() {
    if (isLoading) {
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      );
    }

    if (isError) {
      return (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          borderRadius: 16, border: "1px solid #fecaca", background: "#fef2f2",
          padding: "64px 24px", textAlign: "center",
        }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#fee2e2", display: "grid", placeItems: "center" }}>
            <AlertCircle size={24} color="#ef4444" />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#b91c1c", margin: 0 }}>Failed to load internships</p>
            <p style={{ fontSize: 13, color: "#ef4444", marginTop: 4 }}>
              {error instanceof Error ? error.message : "Something went wrong. Please try again."}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#dc2626", color: "#fff", border: "none",
              borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600,
              cursor: isFetching ? "not-allowed" : "pointer", opacity: isFetching ? 0.6 : 1,
            }}
          >
            <RefreshCcw size={14} style={{ animation: isFetching ? "spin 0.8s linear infinite" : "none" }} />
            {isFetching ? "Retrying…" : "Try again"}
          </button>
        </div>
      );
    }

    if (filtered.length === 0) {
      const hasQuery = search.trim().length > 0;
      return (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          borderRadius: 16, border: "1px solid #e2e8f0", background: "#fff",
          padding: "80px 24px", textAlign: "center",
        }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#eef2fb", display: "grid", placeItems: "center" }}>
            <ClipboardList size={28} color="#1565C0" />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0 }}>
              {hasQuery ? "No results found" : "No internships yet"}
            </p>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 4, maxWidth: 280 }}>
              {hasQuery
                ? `No internships match "${search}". Try a different search term.`
                : "There are no pending internship listings at the moment."}
            </p>
          </div>
          {hasQuery ? (
            <button onClick={() => setSearch("")} style={{ border: "1px solid #e2e8f0", background: "#fff", borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 600, color: "#475569", cursor: "pointer" }}>
              Clear search
            </button>
          ) : (
            <button onClick={() => refetch()} disabled={isFetching} style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e2e8f0", background: "#fff", borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 600, color: "#475569", cursor: "pointer" }}>
              <RefreshCcw size={12} style={{ animation: isFetching ? "spin 0.8s linear infinite" : "none" }} />
              Refresh
            </button>
          )}
        </div>
      );
    }

    return (
      <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {filtered.map((item) => (
            <InternshipCard
              key={item.id}
              item={item}
              busy={busyId === item.id}
              onReject={(id) => respondTo(id, "rejected")}
              onApprove={(id) => respondTo(id, "approved")}
            />
          ))}
        </div>
        <div style={{ marginTop: 40, borderTop: "1px solid #e2e8f0", paddingTop: 24 }}>
          <Pagination current={page} total={10} onChange={setPage} />
        </div>
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#eef2fb", fontFamily: "sans-serif" }}>
      {/* ── Main ── */}
      <main className="min-h-screen" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 16px" }}>

        {/* Search bar + title */}
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: "#0f172a", margin: "0 0 24px", letterSpacing: "-0.5px" }}>
            Training <span style={{ color: "#1565C0" }}>provided</span> by the companys
          </h1>

          {/* Search */}

        </div>

        {renderContent()}
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #e2e8f0", background: "#fff", padding: "24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#1565C0", display: "grid", placeItems: "center" }}>
              <Briefcase size={14} color="white" />
            </div>
            <span style={{ fontWeight: 800, color: "#0f172a", letterSpacing: "-0.3px" }}>Darrabny</span>
          </div>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>© 2025 Darrabny. All rights reserved.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {["Facebook", "X", "Instagram", "LinkedIn"].map((s) => (
                <button key={s} style={{ fontSize: 12, fontWeight: 500, color: "#64748b", background: "none", border: "none", cursor: "pointer" }}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
