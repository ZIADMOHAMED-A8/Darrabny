"use client";

import { useMemo } from "react";
import InternshipCard from "@/components/shared/internship-card";
import {
  COMPANY_INTERNSHIPS,
  CompanyInternshipStatus,
} from "../_data/internships";

type Props = {
  tab: CompanyInternshipStatus;
};

export default function CompanyInternshipsGrid({ tab }: Props) {
  const filtered = useMemo(() => {
    if (tab === "all") return COMPANY_INTERNSHIPS;
    return COMPANY_INTERNSHIPS.filter((x) => x.status === tab);
  }, [tab]);

  const onToggleSave = (id: string) => {
    console.log("toggle save", id);
  };

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {filtered.map((it) => (
        <InternshipCard
          key={it.id}
          data={{
            ...it,
            href: `/internships/${it.id}`,
          }}
          onToggleSave={() => onToggleSave(it.id)}
        />
      ))}
    </div>
  );
}
