"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CompaniesHero from "./companies-hero";
import type { Company } from "../_data/companies.data";
import useGetAllCompanies from "../hooks/use-get-all-companies";
import useGetFeaturedCompanies from "../hooks/use-get-featured-companies";
import useSearchCompanies from "../hooks/use-search-companies";

const PAGE_SIZE = 3;
const SEARCH_PAGE_SIZE = 10;

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiLogo {
  secure_url: string;
  public_id: string;
}

interface ApiCompany {
  _id?: string;
  id?: string;
  companyName?: string;
  name?: string;
  industry?: string;
  address?: string;
  rating?: number;
  totalReviews?: number;
  isFeatured?: boolean;
  highlight?: string;
  logo?: ApiLogo;
}

// ─── Cover (logo image or initials banner) ────────────────────────────────────

const INITIALS_GRADIENTS = [
  "from-blue-100 to-blue-200 text-blue-700",
  "from-emerald-100 to-emerald-200 text-emerald-700",
  "from-violet-100 to-violet-200 text-violet-700",
  "from-amber-100 to-amber-200 text-amber-700",
  "from-rose-100 to-rose-200 text-rose-700",
  "from-cyan-100 to-cyan-200 text-cyan-700",
  "from-indigo-100 to-indigo-200 text-indigo-700",
  "from-teal-100 to-teal-200 text-teal-700",
];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function getGradient(name: string): string {
  const index =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    INITIALS_GRADIENTS.length;
  return INITIALS_GRADIENTS[index];
}

function CompanyCover({ name, logoUrl }: { name: string; logoUrl?: string }) {
  if (logoUrl) {
    return (
      <div className="relative h-[165px] w-full bg-[#f2f5fc]">
        <Image
          src={logoUrl}
          alt={name}
          fill
          className="object-cover p-6"
          onError={(e) => {
            // swap to initials banner on broken URL
            const wrapper = e.currentTarget.closest(".logo-cover-wrapper") as HTMLElement | null;
            if (wrapper) {
              wrapper.setAttribute("data-broken", "true");
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-[165px] w-full items-center justify-center bg-gradient-to-br ${getGradient(name)}`}
    >
      <span className="text-5xl font-bold tracking-tight">{getInitials(name)}</span>
    </div>
  );
}

// ─── CompanyCard ──────────────────────────────────────────────────────────────

function CompanyCard({ c }: { c: Company }) {
  return (
    <Link
      href={`/student/companies/${c.id}`}
      className="overflow-hidden rounded-2xl border border-[#0b1f33]/10 bg-white shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition hover:-translate-y-0.5"
    >
      <CompanyCover name={c.name} logoUrl={c.logoUrl} />

      <div className="p-4">
        <h3 className="text-xl font-semibold leading-7 text-[#0b1f33] sm:text-2xl">
          {c.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#0b1f33]/70">
          {c.desc}
        </p>
      </div>
    </Link>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapApiCompanyToCompany(company: ApiCompany, index: number): Company {
  return {
    id: company.id || company._id || String(index),
    name: company.companyName || company.name || "Unnamed Company",
    desc:
      company.highlight ||
      (company.industry
        ? `${company.industry} company based at ${company.address || "an unspecified location"}.`
        : "Company profile details are coming soon."),
    location: company.address || "Location not specified",
    rating: Number(company.rating || 0),
    reviews: Number(company.totalReviews || 0),
    featured: company.isFeatured,
    industry: company.industry,
    tagline: company.highlight,
    logoUrl: company.logo?.secure_url,
  };
}

function buildPaginationItems(
  currentPage: number,
  totalPages: number
): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage > 3) items.push("ellipsis");
  for (let i = start; i <= end; i++) items.push(i);
  if (currentPage < totalPages - 2) items.push("ellipsis");

  items.push(totalPages);
  return items;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function CompaniesPagination({
  page,
  totalPages,
  isLoading,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (nextPage: number) => void;
}) {
  const items = buildPaginationItems(page, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#0b1f33]/70">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1 || isLoading}
        className="rounded-full border border-[#0b1f33]/10 px-4 py-2 font-semibold hover:bg-[#0b1f33]/5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-2">...</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            disabled={item === page || isLoading}
            className={[
              "h-10 w-10 rounded-full font-bold",
              item === page
                ? "bg-[#013e6f] text-white"
                : "border border-[#0b1f33]/10 hover:bg-[#0b1f33]/5",
              "disabled:cursor-not-allowed disabled:opacity-60",
            ].join(" ")}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages || isLoading}
        className="rounded-full border border-[#0b1f33]/10 px-4 py-2 font-semibold hover:bg-[#0b1f33]/5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function CompaniesSection() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const searchQuery = q.trim();
  const isSearching = searchQuery.length > 0;

  const {
    data: featuredData,
    error: featuredError,
    isLoading: isFeaturedLoading,
    isError: isFeaturedError,
  } = useGetFeaturedCompanies();

  const { data, error, isLoading, isError, isFetching } = useGetAllCompanies({
    page,
    limit: PAGE_SIZE,
  });

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
    isError: isSearchError,
    isFetching: isSearchFetching,
  } = useSearchCompanies({
    q: searchQuery,
    page: searchPage,
    limit: SEARCH_PAGE_SIZE,
  });

  useEffect(() => {
    setSearchPage(1);
  }, [q]);

  const featured = useMemo(
    () =>
      featuredData?.featured.map<Company>((company: ApiCompany, index: number) => ({
        id: company.id || String(index),
        name: company.name || "Unnamed Company",
        desc:
          company.highlight ||
          (company.industry
            ? `${company.industry} company based at ${company.address || "an unspecified location"}.`
            : "Company profile details are coming soon."),
        location: company.address || "Location not specified",
        rating: Number(company.rating || 0),
        reviews: Number(company.totalReviews || 0),
        featured: true,
        industry: company.industry,
        tagline: company.highlight,
        logoUrl: company.logo?.secure_url,
      })) ?? [],
    [featuredData?.featured]
  );

  const allCompanies = useMemo(
    () => data?.companies.map((c: ApiCompany, i: number) => mapApiCompanyToCompany(c, i)) ?? [],
    [data?.companies]
  );

  const searchResults = useMemo(
    () => searchData?.results.map((c: ApiCompany, i: number) => mapApiCompanyToCompany(c, i)) ?? [],
    [searchData?.results]
  );

  const totalPages = Math.max(1, Number(data?.pagination?.totalPages || 1));
  const searchTotalPages = Math.max(1, Number(searchData?.pagination?.totalPages || 1));

  return (
    <section className="w-full">
      <div className="rounded-2xl px-4 py-6 sm:px-6 md:p-8">
        <CompaniesHero query={q} onChange={setQ} />

        {!isSearching && (
          <>
            {/* Featured */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-[#0b1f33] sm:text-[34px]">
                Featured Companies
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {featured.map((c) => <CompanyCard key={c.id} c={c} />)}
              </div>
              {isFeaturedLoading && (
                <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">Loading featured companies...</p>
              )}
              {isFeaturedError && (
                <p className="mt-6 text-center text-sm font-medium text-red-600">
                  {featuredError instanceof Error ? featuredError.message : "Failed to load featured companies."}
                </p>
              )}
              {!isFeaturedLoading && !isFeaturedError && featured.length === 0 && (
                <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">No featured companies found.</p>
              )}
            </div>

            {/* All */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-[#0b1f33] sm:text-[34px]">All Companies</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {allCompanies.map((c) => <CompanyCard key={c.id} c={c} />)}
              </div>
              {isLoading && (
                <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">Loading companies...</p>
              )}
              {isError && (
                <p className="mt-6 text-center text-sm font-medium text-red-600">
                  {error instanceof Error ? error.message : "Failed to load companies."}
                </p>
              )}
              {!isLoading && !isError && allCompanies.length === 0 && (
                <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">No companies found.</p>
              )}
              {totalPages > 1 && (
                <div className="mt-14">
                  <CompaniesPagination page={page} totalPages={totalPages} isLoading={isLoading || isFetching} onPageChange={setPage} />
                </div>
              )}
            </div>
          </>
        )}

        {isSearching && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0b1f33] sm:text-[34px]">Search Results</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {searchResults.map((c) => <CompanyCard key={c.id} c={c} />)}
            </div>
            {isSearchLoading && (
              <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">Searching companies...</p>
            )}
            {isSearchError && (
              <p className="mt-6 text-center text-sm font-medium text-red-600">
                {searchError instanceof Error ? searchError.message : "Failed to search companies."}
              </p>
            )}
            {!isSearchLoading && !isSearchError && searchResults.length === 0 && (
              <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">No companies matched your search.</p>
            )}
            {searchTotalPages > 1 && (
              <div className="mt-14">
                <CompaniesPagination page={searchPage} totalPages={searchTotalPages} isLoading={isSearchLoading || isSearchFetching} onPageChange={setSearchPage} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}