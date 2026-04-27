"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import CompanyInternshipsHeader from "./_components/company-internships-header";
import CompanyInternshipsTabs from "./_components/company-internships-tabs";
import CompanyInternshipsGrid from "./_components/company-internships-grid";
import CompanyInternshipsPagination from "./_components/company-internships-pagination";

import { CompanyInternshipStatus } from "./_data/internships";
import useGetCompanyInternships from "./hooks/useGetCompanyInternships";
import type {
  EmploymentType,
  InternshipCardData,
  InternshipMode,
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
        return {
          id,
          title: item.title ?? "Untitled Internship",
          company:
            typeof item.company === "string"
              ? item.company
              : item.company?.name ?? "Unknown Company",
          mode: normalizeMode(item.mode ?? item.location),
          employmentType: normalizeEmploymentType(item.employmentType),
          duration: item.duration,
          imageUrl:
            item.imageUrl ??
            item.image ??
            "/images/company/company-logo.png",
          href: `/internships/${id}`,
        };
      }),
    [rawItems]
  );

  const total = Number(data?.meta?.total ?? data?.total ?? rawItems.length);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <main className="relative px-16 min-h-screen overflow-hidden bg-[var(--ic-bg)] text-white">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-90"
        />
      </div>

      <div className="relative z-10 py-10">
        <CompanyInternshipsHeader />

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

function normalizeMode(value?: string): InternshipMode {
  const normalized = (value ?? "").toLowerCase();
  if (normalized.includes("hybrid")) return "Hybrid";
  if (
    normalized.includes("on-site") ||
    normalized.includes("onsite") ||
    normalized.includes("on site")
  ) {
    return "On-site";
  }
  if (normalized.includes("remote")) return "Remote";
  return "Remote";
}

function normalizeEmploymentType(value?: string): EmploymentType {
  const normalized = (value ?? "").toLowerCase();
  if (normalized.includes("part")) return "Part-time";
  if (normalized.includes("contract")) return "Contract";
  if (normalized.includes("intern")) return "Internship";
  return "Full-time";
}
