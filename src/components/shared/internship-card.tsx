"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, BookmarkCheck, MapPin, Briefcase, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { InternshipCardData } from "@/lib/types/internships/internships";

type Props = {
  data: InternshipCardData;
  href?: string;
  onToggleSave?: (id: string, next: boolean) => void;
};

export default function InternshipCard({
  data,
  href = "#",
  onToggleSave,
}: Props) {
  const {
    id,
    company,
    title,
    mode,
    employmentType,
    duration,
    imageUrl,
    saved,
    status,
  } = data as InternshipCardData & {
    status?: "active" | "closed" | "starting";
  };

  const statusLabel =
    status === "active"
      ? "Active"
      : status === "closed"
      ? "Closed"
      : status === "starting"
      ? "Starting soon"
      : null;

  const statusClass =
    status === "active"
      ? "bg-[#F1FFF4] text-[#1DB954] border-[#D7F5DF]"
      : status === "closed"
      ? "bg-[#FFF3F3] text-[#E53935] border-[#F3D4D4]"
      : status === "starting"
      ? "bg-[#FFF9E9] text-[#D4A514] border-[#F4E7B8]"
      : "";

  return (
    <Link
      href={href}
      className="group block"
      aria-label={`Open internship ${title}`}
    >
      <article
        className={cn(
          "relative overflow-hidden rounded-[22px] border border-[#D9E2EC] bg-white",
          "shadow-[0_4px_14px_rgba(15,23,42,0.05)] transition-all duration-200",
          "hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
        )}
      >
        {/* Grid layout */}
        <div className="grid grid-cols-[140px_1fr] gap-4 p-4 md:gap-5 md:p-5">

          {/* Left image */}
          <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-[#EEF3F8]">
            <Image
              src={imageUrl}
              alt={`${title} - ${company}`}
              fill
              sizes="140px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>

          {/* Right content */}
          <div className="flex min-w-0 flex-1 flex-col">
            
            {/* top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {company && (
                  <p className="truncate text-[14px] font-medium text-[#6B7280]">
                    {company}
                  </p>
                )}

                <h3 className="mt-1 line-clamp-2 text-[20px] font-extrabold leading-[1.25] text-[#0B1B35] md:text-[22px]">
                  {title}
                </h3>
              </div>

              {statusLabel && (
                <span
                  className={cn(
                    "inline-flex shrink-0 rounded-full border px-3 py-1 text-[13px] font-bold",
                    statusClass
                  )}
                >
                  {statusLabel}
                </span>
              )}
            </div>

            {/* meta row */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {mode}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {employmentType}
              </span>

              {duration && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {duration}
                </span>
              )}
            </div>

            {/* bottom row */}
            <div className="mt-4 flex items-end justify-between gap-3">
              <span
                className={cn(
                  "inline-flex h-[42px] items-center justify-center rounded-[10px]",
                  "bg-[#1686E6] px-5 text-[15px] font-bold text-white",
                  "transition-colors duration-200 group-hover:bg-[#0F78D3]"
                )}
              >
                View Details
              </span>

              <button
                type="button"
                aria-label={saved ? "Remove bookmark" : "Save internship"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleSave?.(id, !saved);
                }}
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]",
                  "border border-[#D9E2EC] bg-white text-[#0B1B35]",
                  "transition-colors hover:bg-[#F4F8FC]"
                )}
              >
                {saved ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
            </div>

          </div>
        </div>
      </article>
    </Link>
  );
}