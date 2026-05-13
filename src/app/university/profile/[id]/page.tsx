"use client";

import { useParams } from "next/navigation";
import { useInternshipReport } from "../hooks/use-internship-report";

export default function InternshipReportPage() {
  const params = useParams();
  const reportId = params.id as string;
  const { data: report, isLoading, error } = useInternshipReport(reportId);

  if (isLoading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (error) return <div style={{ padding: 24, color: "#c62828" }}>Error: {error instanceof Error ? error.message : "Failed to load report"}</div>;
  if (!report) return <div style={{ padding: 24 }}>Report not found</div>;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; color: string }> = {
      approved: { bg: "#E8F5E9", color: "#2e7d32" },
      pending: { bg: "#FFF8E1", color: "#f57f17" },
      rejected: { bg: "#FFEBEE", color: "#c62828" },
    };
    return badges[status.toLowerCase()] || badges.pending;
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return "#2e7d32";
    if (score >= 60) return "#f57f17";
    return "#c62828";
  };

  const statusBadge = getStatusBadge(report.status);
  const performanceColor = getPerformanceColor(report.performanceScore);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F7FB", fontFamily: "sans-serif", fontSize: 14 }}>
      {/* Sidebar */}
      <aside style={{ width: 200, background: "#fff", borderRight: "0.5px solid #e5e7eb", display: "flex", flexDirection: "column", padding: "20px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px 20px", borderBottom: "0.5px solid #e5e7eb" }}>
          <div style={{ width: 32, height: 32, background: "#1565C0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="white" width={18} height={18}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1565C0" }}>Darrabny</div>
            <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.5px", textTransform: "uppercase" }}>Internship Hub</div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          {[
            { label: "Dashboard", icon: <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />, active: false },
            { label: "Monitoring Report", icon: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />, active: true },
            { label: "Company Partners", icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />, active: false },
            { label: "Settings", icon: <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54A.484.484 0 0016 5h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L4.81 11.47c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />, active: false },
          ].map(({ label, icon, active }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 20px", fontSize: 13, color: active ? "#1565C0" : "#555", cursor: "pointer", background: active ? "#EEF3FF" : "transparent", borderRight: active ? "2px solid #1565C0" : "none", fontWeight: active ? 500 : 400 }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>{icon}</svg>
              {label}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", padding: "0 12px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#1565C0", color: "white", border: "none", padding: "9px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer", width: "100%" }}>
            <svg viewBox="0 0 24 24" fill="white" width={14} height={14}><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        {/* Top Nav */}
        <nav style={{ background: "#fff", borderBottom: "0.5px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 52 }}>
          <div style={{ display: "flex", gap: 24 }}>
            {["Dashboard", "Internships", "Profile"].map((link) => (
              <span key={link} style={{ fontSize: 13, color: link === "Profile" ? "#1565C0" : "#888", cursor: "pointer", height: 52, display: "flex", alignItems: "center", borderBottom: link === "Profile" ? "2px solid #1565C0" : "2px solid transparent", fontWeight: link === "Profile" ? 500 : 400 }}>
                {link}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F5F7FB", border: "0.5px solid #e5e7eb", borderRadius: 20, padding: "6px 14px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2} width={14} height={14}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input placeholder="Search reports..." style={{ border: "none", background: "transparent", fontSize: 13, color: "#888", outline: "none", width: 160 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F7FB" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1565C0", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>A</div>
          </div>
        </nav>

        {/* Content */}
        <div style={{ padding: 24, flex: 1 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>{report.title}</div>
              <div style={{ fontSize: 13, color: "#888" }}>Report ID: {report.id}</div>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", background: statusBadge.bg, color: statusBadge.color, fontSize: 12, padding: "6px 14px", borderRadius: 20, fontWeight: 600, textTransform: "capitalize" }}>{report.status}</span>
          </div>



          {/* Report Period & Performance */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 20 }}>
            {/* Period */}
            <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", marginBottom: 16 }}>Report Period</div>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Start Date</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a2e" }}>{new Date(report.periodStart).toLocaleDateString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>End Date</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a2e" }}>{new Date(report.periodEnd).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            {/* Performance Score */}
            <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", marginBottom: 16 }}>Performance Score</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#F5F7FB", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: performanceColor }}>{report.performanceScore}</div>
                  <div style={{ fontSize: 10, color: "#999" }}>/ 100</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 8, background: "#F0F2F5", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
                    <div style={{ width: `${report.performanceScore}%`, height: "100%", background: performanceColor, borderRadius: 4 }} />
                  </div>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {report.performanceScore >= 80 ? "Excellent" : report.performanceScore >= 60 ? "Good" : "Needs Improvement"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Sections */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
            {[
              { title: "Key Achievements", content: report.keyAchievements },
              { title: "Challenges Faced", content: report.challengesFaced },
              { title: "Learning Outcomes", content: report.learningOutcomes },
            ].map(({ title, content }) => (
              <div key={title} style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", marginBottom: 12 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{content || "—"}</div>
              </div>
            ))}
          </div>

          {/* Skills Assessment */}
          <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", marginBottom: 16 }}>Skills Assessment</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {report.skillsAssessment.map(({ skillName, percentage }) => (
                <div key={skillName}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1a2e" }}>{skillName}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1565C0" }}>{percentage}%</span>
                  </div>
                  <div style={{ height: 8, background: "#F0F2F5", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${percentage}%`, height: "100%", background: "#1565C0", borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 20 }}>
            {report.tasksCompleted && (
              <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", marginBottom: 12 }}>Tasks Completed</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{report.tasksCompleted || "—"}</div>
              </div>
            )}
            {report.attendanceNotes && (
              <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", marginBottom: 12 }}>Attendance Notes</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{report.attendanceNotes || "—"}</div>
              </div>
            )}
          </div>

          {/* Attachments */}
          <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", marginBottom: 16 }}>Attachments</div>
            {report.attachments && report.attachments.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
                {report.attachments.map((attachment: any, index: number) => (
                  <div key={index} style={{ border: "0.5px solid #e5e7eb", borderRadius: 8, padding: 12, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "all 0.2s" }}>
                    <svg viewBox="0 0 24 24" fill="#1565C0" width={20} height={20}><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" /></svg>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{attachment.name || `File ${index + 1}`}</div>
                      <div style={{ fontSize: 10, color: "#999" }}>{attachment.size ? `${(attachment.size / 1024).toFixed(2)} KB` : "—"}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: "#999", textAlign: "center", padding: "20px 0" }}>No attachments</div>
            )}
          </div>

          {/* Comments */}
          <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", marginBottom: 16 }}>Comments</div>
            {report.comments && report.comments.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {report.comments.map((comment: any, index: number) => (
                  <div key={index} style={{ borderBottom: index < report.comments.length - 1 ? "0.5px solid #e5e7eb" : "none", paddingBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#1565C0" }}>
                        {comment.author?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a2e" }}>{comment.author || "Anonymous"}</div>
                        <div style={{ fontSize: 11, color: "#999" }}>{comment.date ? new Date(comment.date).toLocaleDateString() : "—"}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginLeft: 42 }}>{comment.text || comment.content || "—"}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: "#999", textAlign: "center", padding: "20px 0" }}>No comments yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
