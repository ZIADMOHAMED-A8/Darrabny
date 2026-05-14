"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCollegeReports } from "./hooks/use-college-reports";

type CollegeIntern = {
    applicationId: string;
    reportId?: string;
    student: {
        fullName?: string;
        university?: string;
        faculty?: string;
        profilePic?: {
            secure_url?: string;
        };
    };
    reports?: { _id: string }[];
};

type CollegeInternshipReport = {
    internship?: {
        title?: string;
    };
    interns: CollegeIntern[];
};

export default function UniversityDashboardPage() {
    const router = useRouter();
    const { data, isLoading } = useCollegeReports();

    if (isLoading) return <p className="p-10">Loading...</p>;

    const internships = (data || []) as CollegeInternshipReport[];
    const totalInterns = internships.reduce((acc, i) => acc + i.interns.length, 0);
    const activePrograms = internships.length;

    const getPerformanceBadge = (index: number) => {
        const badges = [
            { label: "GOOD", bg: "#E8F5E9", color: "#2e7d32" },
            { label: "AVERAGE", bg: "#FFF8E1", color: "#f57f17" },
            { label: "NEEDS IMPROVEMENT", bg: "#FFEBEE", color: "#c62828" },
            { label: "GOOD", bg: "#E8F5E9", color: "#2e7d32" },
        ];
        return badges[index % badges.length];
    };

    const getProgramTag = (title: string) => {
        const colors: Record<string, { bg: string; color: string }> = {
            default: { bg: "#EEF3FF", color: "#1565C0" },
            ml: { bg: "#FFF3E0", color: "#e65100" },
            brand: { bg: "#F3E5F5", color: "#6a1b9a" },
            markets: { bg: "#E0F7FA", color: "#00695c" },
        };
        if (title?.toLowerCase().includes("ml") || title?.toLowerCase().includes("ops")) return colors.ml;
        if (title?.toLowerCase().includes("brand") || title?.toLowerCase().includes("market")) return colors.brand;
        if (title?.toLowerCase().includes("global") || title?.toLowerCase().includes("finance")) return colors.markets;
        return colors.default;
    };

    const allInterns: { intern: CollegeIntern; item: CollegeInternshipReport; globalIndex: number }[] = [];
    internships.forEach((item) => {
        item.interns.forEach((intern) => {
            allInterns.push({ intern, item, globalIndex: allInterns.length });
        });
    });

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


                {/* Content */}
                <div style={{ padding: 24, flex: 1 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <svg viewBox="0 0 24 24" fill="#1565C0" width={24} height={24}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>
                        University Collaboration & Training Hub
                    </div>
                    <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Monitor training programs, university reports, and associated students</p>

                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
                        {[
                            { label: "Total Interns", value: totalInterns.toLocaleString(), sub: "↑ +12% from last month", subColor: "#2e7d32", iconColor: "#1565C0", iconBg: "#EEF3FF", icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" /> },
                            { label: "Active Programs", value: activePrograms, sub: "✓ All systems operational", subColor: "#1565C0", iconColor: "#0F6E56", iconBg: "#E1F5EE", icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /> },
                            { label: "University Partners", value: 18, sub: "⊙ Across 4 global regions", subColor: "#888", iconColor: "#3B6D11", iconBg: "#EAF3DE", icon: <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /> },
                        ].map(({ label, value, sub, subColor, iconColor, iconBg, icon }) => (
                            <div key={label} style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>{label}</div>
                                    <div style={{ fontSize: 26, fontWeight: 700, color: "#1a1a2e" }}>{value}</div>
                                    <div style={{ fontSize: 11, color: subColor, marginTop: 4, fontWeight: 500 }}>{sub}</div>
                                </div>
                                <div style={{ width: 44, height: 44, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg viewBox="0 0 24 24" fill={iconColor} width={22} height={22}>{icon}</svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Intern Progress Tracker */}
                    <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20 }}>


                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    {["Intern Name", "University", "Faculty", "Training Program", "Performance", "Actions"].map((h) => (
                                        <th key={h} style={{ fontSize: 11, color: "#999", fontWeight: 500, textAlign: "left", padding: "8px 10px", letterSpacing: "0.5px", textTransform: "uppercase" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {allInterns.slice(0, 4).map(({ intern, item, globalIndex }) => {
                                    const badge = getPerformanceBadge(globalIndex);
                                    const tag = getProgramTag(item.internship?.title);
                                    return (
                                        <tr key={intern.applicationId} style={{ borderTop: "0.5px solid #F0F2F5", cursor: "pointer" }} onClick={() => router.push(`/university/dashboard/${intern.applicationId}`)}>
                                            <td style={{ padding: "12px 10px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                                                    <Image
                                                        alt="intern profile picture"
                                                        width={34}
                                                        height={34}
                                                        src={intern.student.profilePic.secure_url}
                                                        style={{
                                                            width: 34,
                                                            height: 34,
                                                            borderRadius: "50%",
                                                            objectFit: "cover",
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                    <div>
                                                        <div style={{ fontWeight: 500, fontSize: 13, color: "#1a1a2e" }}>{intern.student?.fullName}</div>
                                                        <div style={{ fontSize: 11, color: "#aaa" }}>ID: #{intern.applicationId}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: "12px 10px", fontSize: 13, color: "#333" }}>{intern.student?.university || "—"}</td>
                                            <td style={{ padding: "12px 10px", fontSize: 13, color: "#333" }}>{intern.student?.faculty || "—"}</td>
                                            <td style={{ padding: "12px 10px" }}>
                                                <span style={{ display: "inline-flex", alignItems: "center", background: tag.bg, color: tag.color, fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{item.internship?.title}</span>
                                            </td>
                                            <td style={{ padding: "12px 10px" }}>
                                                <span style={{ display: "inline-flex", alignItems: "center", background: badge.bg, color: badge.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{badge.label}</span>
                                            </td>
                                            <td style={{ padding: "12px 10px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#aaa" }}>
                                                    <button
                                                        type="button"
                                                        disabled={!intern.reportId && !intern.reports?.[0]?._id}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            const reportId = intern.reportId || intern.reports?.[0]?._id;
                                                            if (reportId) router.push(`/university/profile/report/${reportId}`);
                                                        }}
                                                        title="View report"
                                                        style={{ border: "none", background: "transparent", padding: 0, color: "inherit", cursor: intern.reportId || intern.reports?.[0]?._id ? "pointer" : "not-allowed", opacity: intern.reportId || intern.reports?.[0]?._id ? 1 : 0.4 }}
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                                                    </button>
                                                    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                            <span style={{ fontSize: 12, color: "#aaa" }}>Showing {Math.min(4, allInterns.length)} of {totalInterns.toLocaleString()} interns</span>
                            <div style={{ display: "flex", gap: 4 }}>
                                {["‹", "1", "2", "3", "›"].map((p) => (
                                    <div key={p} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", background: p === "1" ? "#1565C0" : "transparent", color: p === "1" ? "#fff" : "#555" }}>{p}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
