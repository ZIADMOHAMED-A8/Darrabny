import Image from "next/image";
import Link from "next/link";
import { Download, FileText } from "lucide-react";

type ReportSummary = {
  id?: string;
  title?: string;
  status?: string;
  overallRating?: number;
  createdAt?: string;
};

type Props = {
  title: string;
  company: string;
  status: "in-progress" | "completed";
  thumbnail: string;
  report?: ReportSummary;
  certificateUrl?: string;
};

export default function InternshipProgressCard({
  title,
  company,
  status,
  thumbnail,
  report,
  certificateUrl,
}: Props) {
  const isCompleted = status === "completed";
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/60 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Image
          width={400}
          height={399}
          src={thumbnail}
          alt={`${title} thumbnail`}
          className="h-44 w-full object-cover sm:h-auto sm:w-48 md:w-64"
        />

        {isCompleted && (
          <span className="absolute left-2 top-2 rounded-full bg-green-500 px-3 py-1 text-xs text-white">
            Completed
          </span>
        )}

        <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
          <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
          <p className="text-sm text-gray-500">{company}</p>

          {isCompleted && (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {report?.id && (
                <Link
                  href={`/student/report/${report.id}`}
                  className="flex items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600 sm:px-6"
                >
                  <FileText className="h-4 w-4" />
                  View Report
                </Link>
              )}
              {certificateUrl && (
                <a
                  href={certificateUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white sm:px-6"
                >
                  <Download className="h-4 w-4" />
                  Show Certificate
                </a>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
