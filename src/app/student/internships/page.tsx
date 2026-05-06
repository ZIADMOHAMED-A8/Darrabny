"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Briefcase,
  Building2,
  Clock,
  MapPin,
} from "lucide-react";

import InternshipsFilters from "./_components/internships-filters";
import StudentFooter from "@/components/shared/student-footer";

type Internship = {
  id: string;
  company: string;
  title: string;
  workMode: "Remote" | "On-site" | "Hybrid";
  type: "Full-time" | "Part-time";
  duration: string;
  match?: number;
  reason?: string;
  image?: string;
  matchedSkills?: string[];
  technicalSkills?: string[];
  softSkills?: string[];
};

function ensureStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((x) => typeof x === "string") as string[];
}

function mapInternships(data: any[]): Internship[] {
  return (Array.isArray(data) ? data : [])?.map((item: any, index) => ({
    id: String(item?._id ?? index),
    company:
      item?.companyId?.companyName ||
      item?.companyName ||
      "Unknown Company",

    title:
      item?.internshipTitle ||
      item?.internshipTittle ||
      "Internship",

    workMode:
      item?.internshipLocation === "onsite"
        ? "On-site"
        : item?.internshipLocation === "hybrid"
        ? "Hybrid"
        : "Remote",

    type:
      item?.workingTime === "part-time"
        ? "Part-time"
        : "Full-time",

    duration: `${item?.durationInMonths || 3} months`,

    match:
      typeof item?.matchScore === "number"
        ? Math.round(item.matchScore * 100)
        : undefined,

    reason: item?.why,

    image: item?.thumbnail || "/placeholder.png",
    matchedSkills: ensureStringArray(item?.matchedSkills),
    technicalSkills: ensureStringArray(item?.technicalSkills),
    softSkills: ensureStringArray(item?.softSkills),
  }));
}

export default function InternshipsPage() {
  const { data, isLoading, isError } = useGetRecommendedInternships();

  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const recommended = useMemo(
    () => mapInternships(data || []),
    [data]
  );

  const shown = useMemo(() => {
    if (searchResults !== null) {
      return mapInternships(searchResults);
    }
    return recommended;
  }, [searchResults, recommended]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEF4FF] via-[#F7FAFF] to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <header className="text-center mt-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Explore{" "}
            <span className="text-blue-600">
              Internship
            </span>{" "}
            Opportunities
          </h1>
          <p className="mt-4 mx-auto max-w-3xl text-slate-600">
            Find the perfect internship to kickstart your career. Use the filters below to
            narrow down your search and discover opportunities that match your interests and skills.
          </p>

          <div className="mt-10">
            <InternshipsFilters onResults={setSearchResults} />
          </div>
        </header>

        {/* Title */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">
            {searchResults !== null ? "Search Results" : "Recommended Internships"}
          </h2>
        </div>

        {/* Grid */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Recommended loading */}
          {isLoading && !searchResults && (
            <div className="col-span-full text-center text-slate-600">
              Loading recommended internships...
            </div>
          )}

          {isError && !searchResults && (
            <div className="col-span-full text-center text-red-500">
              Failed to load recommended internships
            </div>
          )}

          {/* Empty */}
          {!isLoading && shown.length === 0 && (
            <div className="col-span-full text-center text-slate-500">
              No internships found
            </div>
          )}

          {/* Cards */}
          {shown.map((it, idx) => (
            <InternshipCard key={it.id} it={it} priority={idx < 2} />
          ))}

        </section>

        <StudentFooter />
      </div>
    </div>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700">
      {label}
    </span>
  );
}

function InternshipCard({
  it,
  priority,
}: {
  it: Internship;
  priority?: boolean;
}) {
  const matchLabel =
    typeof it.match === "number"
      ? `${Math.max(0, Math.min(100, it.match))}% Match`
      : null;

  const chips = (it.matchedSkills?.length ? it.matchedSkills : it.technicalSkills)?.slice(0, 6) ?? [];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {matchLabel && (
        <div className="absolute right-0 top-0 z-10">
          <div className="origin-top-right rotate-45 translate-x-10 translate-y-4 bg-blue-600 px-10 py-1 text-xs font-semibold text-white shadow">
            {matchLabel}
          </div>
        </div>
      )}

      <div className="flex gap-4 p-4">

        {/* Image */}
        <div className="relative h-24 w-28 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
          {it.image ? (
            <Image
              src={it.image}
              alt={it.title}
              fill
              className="object-cover"
              priority={priority}
            />
          ) : (
            <Building2 className="m-auto text-slate-400" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs text-slate-500">{it.company}</p>

          <h3 className="text-lg font-bold text-slate-900">{it.title}</h3>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {it.workMode}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> {it.type}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {it.duration}
            </span>
          </div>

          {(it.reason || chips.length > 0) && (
            <div className="mt-3 rounded-xl bg-blue-50/60 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <div className="h-6 w-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
                  <Building2 className="h-4 w-4" />
                </div>
                WHY THIS MATCHES YOU
              </div>
              {it.reason && (
                <p className="mt-2 text-xs text-slate-700">
                  {it.reason}
                </p>
              )}
              {chips.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {chips.map((s) => (
                    <SkillChip key={s} label={s} />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              href={`/student/internships/${it.id}`}
            >
              View Details
            </Link>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
              aria-label="Save internship"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
