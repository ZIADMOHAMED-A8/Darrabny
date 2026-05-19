"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MapPin,
  Send,
  User,
} from "lucide-react";
import { useCollegeReports } from "../../hooks/use-college-reports";


type Student = {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic?: {
    secure_url?: string;
  };
  skills?: string[];
};

type Report = {
  _id: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  status: string;
  keyAchievements: string;
  challengesFaced: string;
  learningOutcomes: string;
  technicalSkillScore: number;
  problemSolvingScore: number;
  communicationScore: number;
  initiativeScore: number;
  internalNote?: string;
  createdAt: string;
  updatedAt: string;
};

type Intern = {
  applicationId: string;
  student: Student;
  reports: Report[];
  reportId?: string;
};

type Internship = {
  id: string;
  title: string;
  description: string;
  location: string;
  workingTime: string;
  startDate: string;
  endDate: string;
  durationInMonths: number;
  status: string;
};

type CollegeReportItem = {
  internship: Internship;
  interns: Intern[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatus(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function scorePercent(score: number) {
  return Math.min(Math.max((score / 5) * 100, 0), 100);
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="grid grid-cols-[150px_1fr_44px] items-center gap-4">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-400">
        <div
          className="h-full rounded-full bg-[#2396ec]"
          style={{ width: `${scorePercent(score)}%` }}
        />
      </div>
      <span className="text-sm font-bold text-slate-950">{score}/5</span>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[#06315d]">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase text-slate-700">{label}</p>
        <p className="mt-1 text-sm text-slate-700">{value}</p>
      </div>
    </div>
  );
}

export default function UniversityReportPage() {

  const { id } = useParams() as { id: string };
  const { data, isLoading, isError } = useCollegeReports();

  const reportContext = ((data || []) as CollegeReportItem[])
    .flatMap((item) =>
      item.interns.flatMap((intern) =>
        intern.reports.map((report) => ({
          internship: item.internship,
          intern,
          student: intern.student,
          report,
        }))
      )
    )
    .find((item) => item.report._id === id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#eef4ff] p-10 text-slate-950">
        Loading report...
      </main>
    );
  }

  if (isError || !reportContext) {
    return (
      <main className="min-h-screen bg-[#eef4ff] p-10">
        <section className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-xl font-bold text-red-700">Report not found</p>
          <p className="mt-2 text-red-600">
            We could not find a report matching this id in the college reports.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-5 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white"
          >
            Go back
          </button>
        </section>
      </main>
    );
  }

  const { internship, intern, student, report } = reportContext;
  const averageScore =
    (report.technicalSkillScore +
      report.problemSolvingScore +
      report.communicationScore +
      report.initiativeScore) /
    4;
      const router=useRouter()
  return (
    <div className="min-h-screen w-full bg-[#eef4ff] text-slate-950">


      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#087bd3]"
          >
            <ArrowLeft size={16} />
            Back to reports
          </button>

          <section className="flex flex-wrap items-start justify-between gap-5 border-b border-slate-500 pb-7">
            <div>
              <div className="flex flex-wrap items-center gap-5">
                <h1 className="text-4xl font-extrabold text-slate-950">
                  {report.title}
                </h1>
                <span className="inline-flex items-center gap-2 rounded-full bg-yellow-200 px-5 py-2 text-sm font-semibold text-slate-700">
                  <Clock size={16} />
                  {formatStatus(report.status)}
                </span>
              </div>
              <p className="mt-5 text-lg text-slate-600">
                Submitted by{" "}
                <span className="font-semibold text-[#087bd3]">
                  {student.fullName}
                </span>{" "}
                (ID #{intern.applicationId}) | {formatDate(report.periodStart)} -{" "}
                {formatDate(report.periodEnd)}
              </p>
            </div>

          </section>

          <section className="mt-8 grid gap-7 lg:grid-cols-[300px_1fr]">
            <aside className="space-y-7">
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="h-24 bg-[#001225]" />
                <div className="px-6 pb-7">
                  <div className="-mt-12 grid h-24 w-24 place-items-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
                    {student.profilePic?.secure_url ? (
                      <Image
                        src={student.profilePic.secure_url}
                        alt={student.fullName}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-[#087bd3]">
                        {initials(student.fullName)}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-[#06315d]">
                    {student.fullName}
                  </h2>
                  <p className="mt-1 text-slate-600">{internship.title}</p>
                  <div className="mt-6 border-t border-slate-300 pt-5">
                    <InfoItem
                      icon={<Mail size={18} />}
                      label="Email"
                      value={student.email}
                    />
                    <div className="mt-5">
                      <InfoItem
                        icon={<User size={18} />}
                        label="Skills"
                        value={(student.skills || []).join(", ") || "No skills"}
                      />
                    <button className="h-12 px-8 mt-2 rounded-xl border border-[#294D6B] text-[#294D6B] font-semibold text-lg bg-white hover:bg-[#F5F9FF] transition" onClick={()=>{
                      router.push(`/university/student_profile/${intern.student.id}`)
                    }}>View Profile</button>

                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-950">
                  <BriefcaseBusiness size={23} />
                  Placement Info
                </h2>
                <div className="mt-6 space-y-5">
                  <InfoItem
                    icon={<MapPin size={18} />}
                    label="Location"
                    value={formatStatus(internship.location)}
                  />
                  <InfoItem
                    icon={<Clock size={18} />}
                    label="Working Time"
                    value={formatStatus(internship.workingTime)}
                  />
                  <InfoItem
                    icon={<CalendarDays size={18} />}
                    label="Internship Dates"
                    value={`${formatShortDate(internship.startDate)} - ${formatShortDate(
                      internship.endDate
                    )}`}
                  />
                </div>
              </div>
            </aside>

            <section className="space-y-7">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <FileText size={16} />
                    Report Period
                  </p>
                  <p className="mt-5 text-2xl font-bold text-slate-950">
                    {formatShortDate(report.periodStart)}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    to {formatShortDate(report.periodEnd)}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CalendarDays size={16} />
                    Internship Duration
                  </p>
                  <p className="mt-5 text-2xl font-bold text-slate-950">
                    {internship.durationInMonths} months
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatStatus(internship.status)}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={16} />
                    Average Score
                  </p>
                  <p className="mt-5 text-2xl font-bold text-slate-950">
                    {averageScore.toFixed(1)}/5.0
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Based on self-assessment
                  </p>
                </div>
              </div>

              <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-400 px-6 py-5">
                  <h2 className="text-2xl font-bold">
                    Monthly Reflection & Activities
                  </h2>
                  <span className="text-sm text-slate-500">
                    Last updated {formatShortDate(report.updatedAt)}
                  </span>
                </div>
                <div className="space-y-8 p-6">
                  <section>
                    <h3 className="text-xl font-bold">1. Key Achievements</h3>
                    <p className="mt-3 leading-7 text-slate-700">
                      {report.keyAchievements}
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold">2. Challenges Faced</h3>
                    <p className="mt-3 leading-7 text-slate-700">
                      {report.challengesFaced}
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold">3. Learning Outcomes</h3>
                    <p className="mt-3 leading-7 text-slate-700">
                      {report.learningOutcomes}
                    </p>
                  </section>
                </div>
                <div className="grid gap-5 bg-slate-200 p-6 md:grid-cols-2">
                  <ScoreBar
                    label="Technical Skill"
                    score={report.technicalSkillScore}
                  />
                  <ScoreBar
                    label="Communication"
                    score={report.communicationScore}
                  />
                  <ScoreBar
                    label="Problem Solving"
                    score={report.problemSolvingScore}
                  />
                  <ScoreBar label="Initiative" score={report.initiativeScore} />
                </div>
              </article>

              {report.internalNote ? (
                <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <h2 className="border-b border-slate-400 px-6 py-5 text-2xl font-bold">
                    Supervisor Feedback
                  </h2>
                  <div className="p-6">
                    <div className="rounded-lg bg-blue-100 p-5">
                      <p className="text-sm font-bold text-slate-950">
                        Internal Note
                      </p>
                      <p className="mt-2 leading-7 text-slate-700">
                        {report.internalNote}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center gap-4 border-t border-slate-500 pt-6 text-slate-400">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-300 font-bold text-white">
                        {initials(student.fullName)}
                      </span>
                      <span className="flex-1">
                        Add your feedback or request changes...
                      </span>
                      <Send size={20} />
                    </div>
                  </div>
                </article>
              ) : null}
            </section>
          </section>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/university/dashboard"
            className="flex items-center gap-2 text-lg font-bold text-[#2396ec]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[#2396ec] text-white">
              <BriefcaseBusiness size={16} />
            </span>
            Darrabny
          </Link>
          <div className="mt-8 border-t border-slate-400 pt-8 text-sm text-slate-400">
            (c) 2025 Darrabny. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
