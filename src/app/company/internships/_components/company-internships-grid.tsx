<<<<<<< HEAD
import InternshipCard from "@/components/shared/internship-card";
import { getInternships } from "@/lib/api/company/company-internships.api";

export default async function CompanyInternshipsGrid() {
  const internships = await getInternships();

  return (
    <div className="grid items-stretch gap-6 md:grid-cols-2">
      {internships.map((it: any) => (
        <InternshipCard key={it.id} data={it} href={`./internships/${it.id}`} />
      ))}
=======
"use client";

import InternshipCard from "@/components/shared/internship-card";
import type { InternshipCardData } from "@/lib/types/internships/internships";

type Props = {
  items: InternshipCardData[];
  isLoading?: boolean;
  errorMessage?: string;
};

export default function CompanyInternshipsGrid({
  items,
  isLoading,
  errorMessage,
}: Props) {
  const onToggleSave = (id: string) => {
    console.log("toggle save", id);
  };

  return (
    <div className="mt-8">
      {isLoading && (
        <p className="text-sm text-white/70">Loading internships...</p>
      )}

      {errorMessage && (
        <p className="text-sm text-red-300">{errorMessage}</p>
      )}

      {!isLoading && !errorMessage && items.length === 0 && (
        <p className="text-sm text-white/70">No internships found.</p>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {items.map((it) => (
          <InternshipCard
            key={it.id}
            data={it}
            href={it.href}
            onToggleSave={() => onToggleSave(it.id)}
          />
        ))}
      </div>
>>>>>>> adding-user-features
    </div>
  );
}
