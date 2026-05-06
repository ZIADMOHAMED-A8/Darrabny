"use client";

type University = {
  _id: string;
  collegeName: string;
  address: string;
  status?: "available" | "pending" | string;
};

export default function UniversitiesTable({
  data,
  onInvite,
  error,
}: {
  data: University[];
  onInvite: (id: string) => void;
  error?: Error | null;
}) {
  const getStatus = (u: University) => {
    if (u.status === "pending") return "pending";
    return "available";
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "28px 24px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>
          Available Universities
        </h2>

      </div>

      {/* Fetch error */}
      {error && (
        <div style={{
          background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10,
          padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          <span style={{ fontSize: 13, color: "#DC2626" }}>
            Failed to load universities. Please refresh the page.
          </span>
        </div>
      )}

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
            {["University Name", "Status", "", "Location", "Action"].map((h) => (
              <th key={h} style={{
                textAlign: "left", padding: "10px 12px", fontSize: 13,
                fontWeight: 500, color: "#6B7280", whiteSpace: "nowrap",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!error && data?.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: "32px", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>
                No universities found.
              </td>
            </tr>
          )}
          {data?.map((u) => {
            const status = getStatus(u);
            const isPending = status === "pending";
            return (
              <tr key={u._id} style={{ borderBottom: "1px solid #F9FAFB" }}>
                <td style={{ padding: "16px 12px", fontSize: 14, color: "#111827", fontWeight: 500 }}>
                  {u.collegeName}
                </td>

                {/* Status badge */}
                <td style={{ padding: "16px 12px" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center",
                    padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 500,
                    background: isPending ? "#FEF3C7" : "#D1FAE5",
                    color: isPending ? "#92400E" : "#065F46",
                    border: `1px solid ${isPending ? "#FDE68A" : "#A7F3D0"}`,
                  }}>
                    {isPending ? "Pending Request" : "Available"}
                  </span>
                </td>

                {/* Spacer col */}
                <td style={{ padding: "16px 12px", flex: 1 }} />

                <td style={{ padding: "16px 12px", fontSize: 14, color: "#374151" }}>
                  {u.address}
                </td>

                <td style={{ padding: "16px 12px" }}>
                  {isPending ? (
                    <button disabled style={{
                      background: "#F3F4F6", color: "#9CA3AF", border: "1px solid #E5E7EB",
                      borderRadius: 10, padding: "8px 18px", fontSize: 14, fontWeight: 500,
                      cursor: "not-allowed",
                    }}>
                      Request Sent
                    </button>
                  ) : (
                    <button
                      onClick={() => onInvite(u._id)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: "#1D4ED8", color: "#fff", border: "none",
                        borderRadius: 10, padding: "8px 18px", fontSize: 14,
                        fontWeight: 600, cursor: "pointer", transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1E40AF"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1D4ED8"; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Invite to Partner
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}