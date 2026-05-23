"use client";


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
