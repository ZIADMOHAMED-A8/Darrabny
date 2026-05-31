"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Briefcase, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { InternshipCardData } from "@/lib/types/internships/internships";
import { useRouter } from "next/navigation";

type Props = {
  data: InternshipCardData;
  href: string;
  showDetailsButton?: boolean;
  id: string;
};

export default function InternshipCard({
  data,
  href,
  showDetailsButton = true,
  id,
}: Props) {
  const {
    companyId,
    internshipTitle,
    internshipLocation,
    workingTime,
    durationInMonths,
    thumbnail,
  } = data;

  const router = useRouter();

  return (
    <Link
      href={href}
      className="group block h-full"
      aria-label={`Open internship ${internshipTitle}`}
    >
      <article
        className={cn(
          "relative h-full overflow-hidden rounded-[22px] border border-[#D9E2EC] bg-white",
          "shadow-[0_4px_14px_rgba(15,23,42,0.05)] transition-all duration-200",
          "hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
        )}
      >
        <div className="grid gap-4 p-4 sm:grid-cols-[140px_1fr] md:gap-5 md:p-5">
          {/* Left image */}
          <div className="relative h-40 w-full overflow-hidden rounded-[14px] bg-[#EEF3F8] sm:h-full">
            <Image
              src={thumbnail || ''}
              alt={`${internshipTitle} - ${companyId.companyName}`}
              fill
              sizes="140px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>

          {/* Right content */}
          <div className="flex h-full min-w-0 flex-1 flex-col">
            {/* top row */}
            <div className="min-w-0">
              {companyId.companyName && (
                <p className="truncate text-[14px] font-medium text-[#6B7280]">
                  {companyId.companyName}
                </p>
              )}

              <h3 className="mt-1 line-clamp-2 text-[20px] font-extrabold leading-[1.25] text-[#0B1B35] md:text-[22px]">
                {internshipTitle}
              </h3>
            </div>

            {/* meta row */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {internshipLocation}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {workingTime}
              </span>

              {durationInMonths && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {durationInMonths} months
                </span>
              )}
            </div>

            {/* bottom row */}
            {showDetailsButton && (
            <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap sm:items-center">
                <span
                  className={cn(
                    "inline-flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[10px] sm:w-auto",
                    "bg-[#1686E6] px-5 text-[15px] font-bold text-white",
                    "transition-colors duration-200 group-hover:bg-[#0F78D3]"
                  )}
                >
                  View Details
                </span>

                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    console.log(id);
                    router.push(`/company/report/${id}`);
                  }}
                  className={cn(
                    "inline-flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[10px] sm:w-auto",
                    "bg-[#0B1B35] px-5 text-[15px] font-bold text-white",
                    "transition-colors duration-200 hover:bg-[#162845]"
                  )}
                >
                  Add reports
                </span>
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    console.log(id);
                    router.push(`/company/candidates/ai-ranked/${id}`);
                  }}
                  className={cn(
                    "inline-flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[10px] sm:w-auto",
                    "bg-[#0B1B35] px-5 text-[15px] font-bold text-white",
                    "transition-colors duration-200 hover:bg-[#162845]"
                  )}
                >
                  Manage Candidates
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
