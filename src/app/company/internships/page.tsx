
"use client";

import { useMemo, useState } from "react";

import CompanyInternshipsTabs from "./_components/company-internships-tabs";
import CompanyInternshipsGrid from "./_components/company-internships-grid";
import CompanyInternshipsPagination from "./_components/company-internships-pagination";

import { CompanyInternshipStatus } from "./_data/internships";
import useGetCompanyInternships from "./hooks/useGetCompanyInternships";
import type {
  InternshipCardData,
} from "@/lib/types/internships/internships";

type ApiInternship = {
  id?: string;
  _id?: string;
  uuid?: string;
  title?: string;
  mode?: string;
  employmentType?: string;
  duration?: string;
  imageUrl?: string;
  image?: string;
  location?: string;
  company?: { name?: string } | string;
};

export default function CompanyInternshipsPage() {
  const [tab, setTab] = useState<CompanyInternshipStatus>("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error, isFetching } =
    useGetCompanyInternships({
      page,
      limit,
      status: tab,
    });

  const rawItems = (data?.data ?? data?.items ?? []) as ApiInternship[];

  const internships = useMemo<InternshipCardData[]>(
    () =>
      rawItems.map((item, index) => {
        const id = String(item.id ?? item._id ?? item.uuid ?? index + 1);
        const companyName =
          typeof item.company === "string"
            ? item.company
            : item.company?.name ?? "Unknown Company";
        return {
          id,
          internshipTittle: item.title ?? "Untitled Internship",
          internshipLocation: item.location ?? "Remote",
          workingTime: item.employmentType ?? "Internship",
          durationInMonths: parseDurationInMonths(item.duration),
          thumbnail: item.imageUrl ?? item.image ?? "/images/company/company-logo.png",
          companyId: {
            _id: id,
            id,
            companyName,
          },
          href: `/internships/${id}`,
        };
      }),
    [rawItems]
  );

  const total = Number(data?.meta?.total ?? data?.total ?? rawItems.length);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 py-10">
        <CompanyInternshipsTabs
          tab={tab}
          onChange={(nextTab) => {
            setTab(nextTab);
            setPage(1);
          }}
        />

        <CompanyInternshipsGrid
          items={internships}
          isLoading={isLoading}
          errorMessage={
            isError ? (error as Error)?.message || "Failed to load internships." : undefined
          }
        />

        <CompanyInternshipsPagination
          page={page}
          totalPages={totalPages}
          isLoading={isLoading || isFetching}
          onPageChange={(nextPage) => setPage(nextPage)}
        />
      </div>
    </main>
  );
}

function parseDurationInMonths(value?: string): number | undefined {
  if (!value) return undefined;
  const numeric = Number(value.match(/\d+/)?.[0]);
  return Number.isFinite(numeric) ? numeric : undefined;
}
