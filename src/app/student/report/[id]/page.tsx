"use client";

import Footer from "@/components/shared/footer";
import useGetMyInternships from "@/app/student/internships/hooks/useGetMyInternships";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  MapPin,
} from "lucide-react";

type InternshipWithReport = {
  id: string;
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentWeek?: number;
  totalWeeks?: number;
  status?: string;
  company?: { name?: string };
  report?: {
    id?: string;
    title?: string;
    status?: string;
    overallRating?: number;
    createdAt?: string;
  };
  certificate?: { url?: string; issuedAt?: string };
};

function formatDate(value?: string) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatus(value?: string) {
  if (!value) return "Not available";
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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

export default function StudentReportPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data, isLoading, isError } = useGetMyInternships({
    page: 1,
    limit: 100,
  });

  const internship = ((data?.data as InternshipWithReport[] | undefined) ?? []).find(
    (item) => item.report?.id === id,
  );

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#eef4ff] p-10 text-slate-950">
        Loading report...
      </main>
    );
  }

  if (isError || !internship?.report) {
    return (
      <main className="min-h-screen bg-[#eef4ff] p-10">
        <section className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-xl font-bold text-red-700">Report not found</p>
          <p className="mt-2 text-red-600">
            We could not find a report matching this internship.
          </p>
          <button
            type="button"
            onClick={() => router.back()}
            className="mt-5 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white"
          >
            Go back
          </button>
        </section>
      </main>
    );
  }

  const { report, certificate } = internship;

  return (
    <div className="min-h-screen w-full  text-slate-950">
      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#087bd3]"
          >
            <ArrowLeft size={16} />
            Back to internships
          </button>

          <section className="flex flex-wrap items-start justify-between gap-5 border-b border-slate-500 pb-7">
            <div>
              <div className="flex flex-wrap items-center gap-5">
                <h1 className="text-4xl font-extrabold text-slate-950">
                  {report.title ?? "Internship Report"}
                </h1>
                <span className="inline-flex items-center gap-2 rounded-full bg-yellow-200 px-5 py-2 text-sm font-semibold text-slate-700">
                  <Clock size={16} />
                  {formatStatus(report.status)}
                </span>
              </div>
              <p className="mt-5 text-lg text-slate-600">
                Report for <span className="font-semibold text-[#087bd3]">{internship.title}</span>
                {internship.company?.name ? ` at ${internship.company.name}` : ""}
              </p>
            </div>

            {certificate?.url && (
              <a
                href={certificate.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#294D6B] px-5 font-semibold text-white transition hover:bg-[#1f3b54]"
              >
                <Download size={18} />
                Download Certificate
              </a>
            )}
          </section>

          <section className="mt-8 grid gap-7 lg:grid-cols-[300px_1fr]">
            <aside className="space-y-7">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-950">
                  <BriefcaseBusiness size={23} />
                  Placement Info
                </h2>
                <div className="mt-6 space-y-5">
                  <InfoItem
                    icon={<BriefcaseBusiness size={18} />}
                    label="Company"
                    value={internship.company?.name ?? "Not available"}
                  />
                  <InfoItem
                    icon={<MapPin size={18} />}
                    label="Location"
                    value={formatStatus(internship.location)}
                  />
                  <InfoItem
                    icon={<CalendarDays size={18} />}
                    label="Internship Dates"
                    value={`${formatDate(internship.startDate)} - ${formatDate(internship.endDate)}`}
                  />
                </div>
              </div>
            </aside>

            <section className="space-y-7">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <FileText size={16} /> Report Created
                  </p>
                  <p className="mt-5 text-2xl font-bold text-slate-950">
                    {formatDate(report.createdAt)}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={16} /> Overall Rating
                  </p>
                  <p className="mt-5 text-2xl font-bold text-slate-950">
                    {report.overallRating != null ? `${report.overallRating}/5.0` : "Not rated"}
                  </p>
                </div>
              </div>

              <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-400 px-6 py-5">
                  <h2 className="text-2xl font-bold">Report Summary</h2>
                </div>
                <div className="grid gap-6 p-6 sm:grid-cols-2">
                  <InfoItem
                    icon={<FileText size={18} />}
                    label="Report Title"
                    value={report.title ?? "Internship Report"}
                  />
                  <InfoItem
                    icon={<Clock size={18} />}
                    label="Report Status"
                    value={formatStatus(report.status)}
                  />
                  {certificate?.issuedAt && (
                    <InfoItem
                      icon={<CheckCircle2 size={18} />}
                      label="Certificate Issued"
                      value={formatDate(certificate.issuedAt)}
                    />
                  )}
                </div>
              </article>
            </section>
          </section>
        </div>
      </main>

      <Footer className="mt-20" />
    </div>
  );
}
