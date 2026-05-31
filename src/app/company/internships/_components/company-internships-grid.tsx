"use client";

import InternshipCard from "@/components/shared/internship-card";
import useGetCompanyInternships from "../hooks/useGetCompanyInternships";
import type { InternshipCardData } from "@/lib/types/internships/internships";

type CompanyInternshipItem = InternshipCardData & {
  _id?: string;
  id?: string;
};

export default function CompanyInternshipsGrid() {
  const { data, isLoading, isError, error } = useGetCompanyInternships();
  const internships = Array.isArray(data) ? data : data?.data ?? [];
  if (isLoading) {
    return (
      <div className="grid items-stretch gap-4 md:grid-cols-2 md:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[180px] animate-pulse rounded-[22px] bg-white/15"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-lg bg-red-500/10 p-4 text-sm text-red-100">
        {error instanceof Error ? error.message : "Failed to load internships."}
      </p>
    );
  }

  if (internships.length === 0) {
    return (
      <p className="rounded-lg bg-white/10 p-4 text-sm text-white/80">
        No internships found.
      </p>
    );
  }
  console.log('kosom eldata',data.data[0])

  console.log('innnnnn',internships[0])
  return (
    <div className="grid items-stretch gap-4 md:grid-cols-2 md:gap-6">
      {(internships as CompanyInternshipItem[]).map((it) => (
        <InternshipCard key={it.id ?? it._id} data={it} id={it._id ?? it.id ?? ""} href={`./internships/${it._id ?? it.id}`} />
      ))}
    </div>
  );
}
