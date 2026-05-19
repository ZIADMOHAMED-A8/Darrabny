"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  Clock,
  MapPin,
} from "lucide-react";

import InternshipsFilters from "./_components/internships-filters";
import StudentFooter from "@/components/shared/student-footer";
import useGetRecommendedInternships from "@/app/student/internships/hooks/useGetRecommendedInternships";
import useGetSavedInternships from "@/app/student/dashboard/hooks/useGetSavedInternships";
import useToggleSaveInternship from "@/app/student/internships/hooks/useToggleSaveInternship";
import { cn } from "@/lib/utils";

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

type SavedInternshipItem = {
  _id?: string;
  id?: string;
};

type RawInternship = {
  _id?: string;
  id?: string;
  companyId?: {
    companyName?: string;
  };
  companyName?: string;
  internshipTitle?: string;
  internshipTittle?: string;
  internshipLocation?: string;
  workingTime?: string;
  durationInMonths?: number | string;
  matchScore?: number;
  why?: string;
  thumbnail?: string;
  matchedSkills?: unknown;
  technicalSkills?: unknown;
  softSkills?: unknown;
};

function ensureStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((x) => typeof x === "string") as string[];
}

function mapInternships(data: unknown[]): Internship[] {
  return (Array.isArray(data) ? data : []).map((rawItem, index) => {
  return (Array.isArray(data) ? data : []).map((rawItem, index) => {
    const item = rawItem as RawInternship;
    const durationInMonths = item.durationInMonths || 3;

    return {
      id: String(item._id ?? item.id ?? index),

      company:
        item.companyId?.companyName ||
        item.companyName ||
        "Unknown Company",
      id: String(item._id ?? item.id ?? index),

      company:
        item.companyId?.companyName ||
        item.companyName ||
        "Unknown Company",

      title:
        item.internshipTitle ||
        item.internshipTittle ||
        "Internship",
      title:
        item.internshipTitle ||
        item.internshipTittle ||
        "Internship",

      workMode:
        item.internshipLocation === "onsite"
          ? "On-site"
          : item.internshipLocation === "hybrid"
          ? "Hybrid"
          : "Remote",
      workMode:
        item.internshipLocation === "onsite"
          ? "On-site"
          : item.internshipLocation === "hybrid"
          ? "Hybrid"
          : "Remote",

      type:
        item.workingTime === "part-time"
          ? "Part-time"
          : "Full-time",
      type:
        item.workingTime === "part-time"
          ? "Part-time"
          : "Full-time",

      duration: `${durationInMonths} months`,
      duration: `${durationInMonths} months`,

      match:
        typeof item.matchScore === "number"
          ? Math.round(item.matchScore * 100)
          : undefined,
      match:
        typeof item.matchScore === "number"
          ? Math.round(item.matchScore * 100)
          : undefined,

      reason: item.why,
      reason: item.why,

      image: item.thumbnail || "/placeholder.png",

      matchedSkills: ensureStringArray(item.matchedSkills),
      technicalSkills: ensureStringArray(item.technicalSkills),
      softSkills: ensureStringArray(item.softSkills),
      image: item.thumbnail || "/placeholder.png",

      matchedSkills: ensureStringArray(item.matchedSkills),
      technicalSkills: ensureStringArray(item.technicalSkills),
      softSkills: ensureStringArray(item.softSkills),
    };
  });
}

export default function InternshipsPage() {
  const { data, isLoading, isError } = useGetRecommendedInternships();


  const { data: savedInternshipsData } = useGetSavedInternships();

  const {
    toggleSaveInternship,
    isPending: isTogglePending,
  } = useToggleSaveInternship();

  const {
    toggleSaveInternship,
    isPending: isTogglePending,
  } = useToggleSaveInternship();

  const [searchResults, setSearchResults] = useState<unknown[] | null>(
    null
  );

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

  const savedIds = useMemo(() => {
    return new Set(
      ((savedInternshipsData ?? []) as SavedInternshipItem[])
        .map((item) => item.id ?? item._id)
        .filter((id): id is string => Boolean(id))
    );
  }, [savedInternshipsData]);

  const handleToggleSave = async (internshipId: string) => {
    await toggleSaveInternship(internshipId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEF4FF] via-[#F7FAFF] to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <header className="mt-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Explore{" "}
            <span className="text-blue-600">
              Internship
            </span>{" "}
            Opportunities
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-slate-600">
            Find the perfect internship to kickstart your career.
            Use the filters below to narrow down your search
            and discover opportunities that match your
            interests and skills.
          </p>

          <div className="mt-10">
            <InternshipsFilters
              onResults={setSearchResults}
            />
          </div>
        </header>

        {/* Title */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">
            {searchResults !== null
              ? "Search Results"
              : "Recommended Internships"}
            {searchResults !== null
              ? "Search Results"
              : "Recommended Internships"}
          </h2>
        </div>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Loading */}
          {isLoading && !searchResults && (
            <div className="col-span-full text-center text-slate-600">
              Loading recommended internships...
            </div>
          )}

          {/* Error */}
          {isError && !searchResults && (
            <div className="col-span-full text-center text-red-500">
              Failed to load recommended internships
            </div>
          )}

          {!isLoading && shown.length === 0 && (
            <div className="col-span-full text-center text-slate-500">
              No internships found
            </div>
          )}

          {shown.map((it, idx) => (
            <InternshipCard
              key={it.id}
              it={it}
              priority={idx < 2}
              isSaved={savedIds.has(it.id)}
              isSaving={isTogglePending}
              onToggleSave={handleToggleSave}
            />
          ))}
        </section>

        <StudentFooter />
      </div>
    </div>
  );
}

function SkillChip({
  label,
}: {
  label: string;
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700">
      {label}
    </span>
  );
}

function InternshipCard({
  it,
  priority,
  isSaved,
  isSaving,
  onToggleSave,
}: {
  it: Internship;
  priority?: boolean;
  isSaved: boolean;
  isSaving: boolean;
  onToggleSave: (
    internshipId: string
  ) => void;
}) {
  const matchLabel =
    typeof it.match === "number"
      ? `${Math.max(
          0,
          Math.min(100, it.match)
        )}% Match`
      : null;

  const chips =
    (
      it.matchedSkills?.length
        ? it.matchedSkills
        : it.technicalSkills
    )?.slice(0, 6) ?? [];

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
        <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          {it.image ? (
            <Image
              src={it.image}
              alt={it.title}
              fill
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Building2 className="text-slate-400" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-xs text-slate-500">
            {it.company}
          </p>
          <p className="text-xs text-slate-500">
            {it.company}
          </p>

          <h3 className="text-lg font-bold text-slate-900">
            {it.title}
          </h3>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          <h3 className="text-lg font-bold text-slate-900">
            {it.title}
          </h3>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {it.workMode}
              <MapPin className="h-3 w-3" />
              {it.workMode}
            </span>


            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {it.type}
              <Briefcase className="h-3 w-3" />
              {it.type}
            </span>


            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {it.duration}
              <Clock className="h-3 w-3" />
              {it.duration}
            </span>
          </div>

          {(it.reason || chips.length > 0) && (
            <div className="mt-3 rounded-xl bg-blue-50/60 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
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
                    <SkillChip
                      key={s}
                      label={s}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <Link
              href={`/student/internships/${it.id}`}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              View Details
            </Link>

            <button
              type="button"
              disabled={isSaving}
              onClick={() =>
                onToggleSave(it.id)
              }
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                isSaved
                  ? "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50",
                isSaving &&
                  "cursor-not-allowed opacity-60"
              )}
              aria-label={
                isSaved
                  ? "Unsave internship"
                  : "Save internship"
              }
              aria-label={
                isSaved
                  ? "Unsave internship"
                  : "Save internship"
              }
              aria-pressed={isSaved}
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4" />
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
                <Bookmark className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}