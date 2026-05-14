"use client";

<<<<<<< HEAD
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleCheck,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Menu,
  PieChart,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { UniversityInternship } from "./actions/get-university-dashboard.action";
import { useUniversityDashboard } from "./hooks/use-university-dashboard";

const navItems = [
  { label: "Dashboard", href: "/university/dashboard" },
  { label: "Internships", href: "/university/internships" },
  { label: "Profile", href: "/university/profile" },
];

function initials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatStatus(status: string) {
  return status
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatValidUntil(value: string | null) {
  if (!value) return "No expiration date set";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function StatCard({
  title,
  value,
  note,
  icon,
  progress,
}: {
  title: string;
  value: string;
  note: string;
  icon: ReactNode;
  progress?: number;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        <div className="text-slate-950">{icon}</div>
      </div>
      <div className="mt-8 flex items-end gap-4">
        <p className="text-5xl font-bold leading-none text-slate-950">
          {value}
        </p>
        {progress === undefined ? (
          <span className="mb-1 inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
            <LineChart size={16} />
            +12%
          </span>
        ) : (
          <span className="mb-1 text-base font-bold text-slate-950">Avg.</span>
        )}
      </div>
      {progress === undefined ? (
        <p className="mt-6 text-base text-slate-950">{note}</p>
      ) : (
        <div className="mt-7 h-2.5 overflow-hidden rounded-full bg-slate-400">
          <div
            className="h-full rounded-full bg-[#2396ec]"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        </div>
      )}
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status.toLowerCase() === "active";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
        isActive
          ? "bg-emerald-200 text-emerald-800"
          : "bg-yellow-200 text-yellow-800"
      }`}
    >
      {formatStatus(status)}
    </span>
  );
}

function InternshipRow({ internship }: { internship: UniversityInternship }) {
  const mark = initials(internship.title) || "IN";

  return (
    <tr className="border-t border-blue-100">
      <td className="px-5 py-6">
        <div className="flex items-center gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-rose-300 text-lg font-bold text-white shadow-md">
            {mark}
          </div>
          <span className="font-medium text-slate-950">{internship.title}</span>
        </div>
      </td>
      <td className="px-5 py-6 text-slate-950">{internship.company.industry}</td>
      <td className="px-5 py-6 text-slate-950">
        {internship.company.companyName}
      </td>
      <td className="px-5 py-6">
        <StatusBadge status={internship.status} />
      </td>
      <td className="px-5 py-6">
        <div className="flex items-center gap-5">
          <span className="text-2xl font-medium text-[#087bd3]">
            {internship.applicantsCount}
          </span>
          <Users size={26} className="text-slate-950" />
        </div>
      </td>
    </tr>
  );
}

function VerificationCard({
  isVerified,
  approvedByAdmin,
  validUntil,
}: {
  isVerified: boolean;
  approvedByAdmin: boolean;
  validUntil: string | null;
}) {
  const verified = isVerified && approvedByAdmin;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-950">Verification Status</h2>
      <div className="mt-8 flex gap-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-slate-100 shadow-md">
          <ShieldCheck size={38} className="text-slate-950" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-950">
            {verified ? "University Verified" : "Verification Pending"}
          </h3>
          <p className="mt-3 max-w-sm text-base leading-5 text-slate-500">
            {verified
              ? "Your university is fully accredited to follow up with trainees from partner institutions."
              : "Your university credentials are awaiting admin approval before full access is granted."}
          </p>
          <p
            className={`mt-5 inline-flex items-center gap-2 text-base ${
              verified ? "text-emerald-700" : "text-amber-700"
            }`}
          >
            {verified ? <CircleCheck size={18} /> : <RefreshCcw size={18} />}
            {verified
              ? `Valid until ${formatValidUntil(validUntil)}`
              : "Pending admin approval"}
          </p>
        </div>
      </div>
      <button className="mt-8 w-full rounded-lg bg-[#087bd3] px-5 py-3 text-xl font-semibold text-white transition hover:bg-[#056bb9]">
        Manage Credentials
      </button>
    </section>
  );
}

export default function UniversityDashboardPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useUniversityDashboard();

  const stats = data?.stats;
  const internships = data?.ongoingInternships || [];
  const partners = data?.academicPartners || [];

  return (
    <div className="min-h-screen bg-[#eef4ff] text-slate-950">
      <header className="border-b border-blue-100 bg-white">
        <div className="flex h-[74px] items-center justify-between px-8">
          <Link
            href="/university/dashboard"
            className="flex items-center gap-2 text-2xl font-bold text-[#087bd3]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#087bd3] text-white">
              <BriefcaseBusiness size={21} />
            </span>
            Darrabny
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-[74px] items-center border-b-2 text-lg font-semibold ${
                  item.label === "Dashboard"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden h-10 w-72 items-center gap-3 rounded-2xl border border-slate-200 px-4 text-slate-400 lg:flex">
            <Search size={18} />
            <input
              className="w-full bg-transparent text-base outline-none"
              placeholder="Search internships..."
            />
          </div>

          <div className="flex items-center gap-5 text-[#005c9b]">
            <Bell size={28} />
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#005c9b] text-white">
              <Menu size={18} />
            </span>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden px-6 py-16 md:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.95),transparent_26%),radial-gradient(circle_at_92%_42%,rgba(255,255,255,0.75),transparent_22%)]" />
        <div className="relative mx-auto max-w-[1760px]">
          <h1 className="text-5xl font-bold text-slate-950">
            University Overview
          </h1>

          {isError ? (
            <section className="mt-12 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-xl font-bold text-red-700">
                Failed to load dashboard
              </p>
              <p className="mt-2 text-red-600">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong."}
              </p>
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="mt-5 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white disabled:opacity-60"
              >
                {isFetching ? "Retrying..." : "Try again"}
              </button>
            </section>
          ) : (
            <>
              <section className="mt-14 grid gap-8 lg:grid-cols-3">
                <StatCard
                  title="Total Applicants"
                  value={
                    isLoading
                      ? "..."
                      : (stats?.totalApplicants || 0).toLocaleString()
                  }
                  note="From last month"
                  icon={<Users size={28} />}
                />
                <StatCard
                  title="Total Completed Trainees"
                  value={
                    isLoading
                      ? "..."
                      : (stats?.totalCompletedTrainees || 0).toLocaleString()
                  }
                  note="From last year"
                  icon={<Users size={28} />}
                />
                <StatCard
                  title="Acceptance Rate"
                  value={`${stats?.acceptanceRate || 0}%`}
                  note="Average acceptance"
                  icon={<PieChart size={30} />}
                  progress={stats?.acceptanceRate || 0}
                />
              </section>

              <section className="mt-9 grid gap-8 xl:grid-cols-[2fr_0.95fr]">
                <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="p-9">
                    <h2 className="text-2xl font-bold text-slate-950">
                      Ongoing Internships
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-collapse">
                      <thead className="border-y border-blue-100">
                        <tr className="text-left text-2xl font-bold text-[#06315d]">
                          <th className="px-7 py-4">Title</th>
                          <th className="px-5 py-4">Role</th>
                          <th className="px-5 py-4">Company</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Student</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          Array.from({ length: 3 }).map((_, index) => (
                            <tr key={index} className="border-t border-blue-100">
                              <td colSpan={5} className="px-7 py-6">
                                <div className="h-7 animate-pulse rounded bg-slate-100" />
                              </td>
                            </tr>
                          ))
                        ) : internships.length > 0 ? (
                          internships.map((internship) => (
                            <InternshipRow
                              key={internship.id}
                              internship={internship}
                            />
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-7 py-12 text-center text-slate-500"
                            >
                              No ongoing internships yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p className="border-t border-blue-100 px-7 py-7 text-center text-lg text-slate-500">
                    Showing {internships.length} of {internships.length} active
                    interns
                  </p>
                </div>

                <aside className="space-y-9">
                  <VerificationCard
                    isVerified={data?.verificationStatus.isVerified || false}
                    approvedByAdmin={
                      data?.verificationStatus.approvedByAdmin || false
                    }
                    validUntil={data?.verificationStatus.validUntil || null}
                  />

                  <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-slate-950">
                        Academic Partners
                      </h2>
                      <button
                        aria-label="Add partner"
                        className="text-slate-950 transition hover:text-[#087bd3]"
                      >
                        <Plus size={26} />
                      </button>
                    </div>

                    <div className="space-y-7">
                      {(isLoading ? [] : partners).map((partner) => (
                        <div
                          key={partner._id}
                          className="flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#c8c7dd] text-sm font-bold text-white shadow-md">
                              {initials(partner.companyName) || "AP"}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-800">
                                {partner.companyName}
                              </h3>
                              <p className="text-sm text-slate-700">
                                {partner.industry}
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={28} />
                        </div>
                      ))}
                    </div>

                    {!isLoading && partners.length === 0 ? (
                      <p className="py-8 text-center text-slate-500">
                        No academic partners yet.
                      </p>
                    ) : null}

                    <div className="mt-8 border-t border-slate-300 pt-6 text-center">
                      <Link
                        href="/university/internships"
                        className="text-2xl font-semibold text-[#087bd3]"
                      >
                        View All Partnerships
                      </Link>
                    </div>
                  </section>
                </aside>
              </section>
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-10 md:px-24">
        <div className="mx-auto max-w-[1580px]">
          <Link
            href="/university/dashboard"
            className="flex items-center gap-2 text-lg font-bold text-[#2396ec]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[#2396ec] text-white">
              <BriefcaseBusiness size={16} />
            </span>
            Darrabny
          </Link>
          <div className="mt-10 border-t border-slate-500 pt-10">
            <div className="flex flex-col gap-6 text-slate-400 md:flex-row md:items-center md:justify-between">
              <p>(c) 2025 Darrabny. All rights reserved.</p>
              <div className="flex items-center gap-7 text-slate-950">
                <LayoutDashboard size={24} />
                <span className="text-2xl font-bold">X</span>
                <GraduationCap size={25} />
                <Check size={25} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
=======
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCollegeReports } from "./hooks/use-college-reports";

export default function UniversityDashboardPage() {
    const router = useRouter();
    const { data, isLoading } = useCollegeReports();

    if (isLoading) return <p className="p-10">Loading...</p>;

    const internships = data || [];
    const totalInterns = internships.reduce((acc: number, i: any) => acc + i.interns.length, 0);
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

    const getAvatar = (name: string, index: number) => {
        const initials = name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "??";
        const avatarStyles = [
            { bg: "#E3ECFF", color: "#1565C0" },
            { bg: "#E8F5E9", color: "#2e7d32" },
            { bg: "#FCE4EC", color: "#c62828" },
            { bg: "#FFF8E1", color: "#f57f17" },
        ];
        const style = avatarStyles[index % avatarStyles.length];
        return { initials, ...style };
    };

    const allInterns: { intern: any; item: any; globalIndex: number }[] = [];
    internships.forEach((item: any) => {
        item.interns.forEach((intern: any) => {
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
                        <input placeholder="Search internships..." style={{ border: "none", background: "transparent", fontSize: 13, color: "#888", outline: "none", width: 160 }} />
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
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>Intern Progress Tracker</div>
                                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Detailed view of current internship lifecycle and performance.</div>
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                                <button style={{ border: "0.5px solid #e5e7eb", background: "#fff", color: "#555", fontSize: 12, padding: "7px 14px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={13} height={13}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                                    Filter
                                </button>
                                <button style={{ background: "#1565C0", color: "#fff", border: "none", fontSize: 12, padding: "7px 14px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}>
                                    <svg viewBox="0 0 24 24" fill="white" width={13} height={13}><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
                                    Export Data
                                </button>
                            </div>
                        </div>

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
                                    const avatar = getAvatar(intern.student?.fullName, globalIndex);
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
                                                    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
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

                    {/* Bottom Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
                        {/* Global Partner Reach */}
                        <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
                            <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>Global Partner Reach</div>
                            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Monitoring active collaborations across 18 universities.</div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 16 }}>
                                {[{ label: "North America", val: 8 }, { label: "Europe", val: 5 }, { label: "Asia Pacific", val: 3 }, { label: "Other", val: 2 }].map(({ label, val }) => (
                                    <div key={label}>
                                        <div style={{ fontSize: 10, color: "#1565C0", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600, marginBottom: 4 }}>{label}</div>
                                        <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e" }}>{val}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 16, background: "#F8FAFF", borderRadius: 8, height: 90, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                                <svg viewBox="0 0 360 100" width="100%" height={90}>
                                    <ellipse cx="180" cy="50" rx="170" ry="45" fill="none" stroke="#D0D8F0" strokeWidth="0.5" />
                                    <path d="M10,50 Q60,30 110,45 Q160,60 210,40 Q260,20 350,50" fill="none" stroke="#C5D0E8" strokeWidth="0.5" />
                                    <path d="M10,60 Q80,40 150,55 Q220,68 290,50 Q320,44 350,55" fill="none" stroke="#C5D0E8" strokeWidth="0.5" />
                                    <circle cx="80" cy="40" r="5" fill="#1565C0" opacity="0.7" />
                                    <circle cx="130" cy="55" r="4" fill="#1565C0" opacity="0.6" />
                                    <circle cx="195" cy="35" r="6" fill="#1565C0" opacity="0.5" />
                                    <circle cx="240" cy="50" r="4" fill="#1565C0" opacity="0.6" />
                                    <circle cx="300" cy="42" r="3" fill="#1565C0" opacity="0.4" />
                                </svg>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ background: "#1a2b4a", borderRadius: 12, padding: 18, color: "#fff" }}>
                                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Generate Reports</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Instant analytics on student satisfaction and program ROI.</div>
                                <button style={{ background: "#fff", color: "#1a2b4a", border: "none", fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: 8, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                    <svg viewBox="0 0 24 24" fill="#1a2b4a" width={15} height={15}><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                                    Report Center
                                </button>
                            </div>

                            <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", marginBottom: 14 }}>Program Health</div>
                                {[{ label: "Completion Rate", pct: 94, color: "#43A047" }, { label: "Engagement Level", pct: 78, color: "#1565C0" }].map(({ label, pct, color }) => (
                                    <div key={label} style={{ marginBottom: 12 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginBottom: 6 }}>
                                            <span>{label}</span><span style={{ fontWeight: 600 }}>{pct}%</span>
                                        </div>
                                        <div style={{ height: 7, background: "#F0F2F5", borderRadius: 4, overflow: "hidden" }}>
                                            <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
>>>>>>> e1e0fccde5a9f1a6f63a8a8a8180c740144450bf
