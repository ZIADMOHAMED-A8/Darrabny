"use client";

import { useEffect, useMemo, useState } from "react";
import CompaniesHero from "./companies-hero";
import CompanyCard from "./company-card";
import type { Company } from "../_data/companies.data";
import useGetAllCompanies from "../hooks/use-get-all-companies";
import useGetFeaturedCompanies from "../hooks/use-get-featured-companies";
import useSearchCompanies from "../hooks/use-search-companies";

const PAGE_SIZE = 3;
const SEARCH_PAGE_SIZE = 10;
const COMPANY_COVERS = [
  "/images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
  "/images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80",
  "/images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80",
];

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
      featuredData?.featured.map<Company>((company, index) => ({
        id: company.id || String(index),
        name: company.name || "Unnamed Company",
        desc:
          company.highlight ||
          (company.industry
            ? `${company.industry} company based at ${
                company.address || "an unspecified location"
              }.`
            : "Company profile details are coming soon."),
        location: company.address || "Location not specified",
        rating: Number(company.rating || 0),
        reviews: Number(company.totalReviews || 0),
        cover: COMPANY_COVERS[index % COMPANY_COVERS.length],
        featured: true,
        industry: company.industry,
        tagline: company.highlight,
      })) ?? [],
    [featuredData?.featured]
  );

  const allCompanies = useMemo(
    () =>
      data?.companies.map((company, index) =>
        mapApiCompanyToCompany(company, index)
      ) ?? [],
    [data?.companies]
  );

  const searchResults = useMemo(
    () =>
      searchData?.results.map((company, index) =>
        mapApiCompanyToCompany(company, index)
      ) ?? [],
    [searchData?.results]
  );

  const pagination = data?.pagination;
  const totalPages = Math.max(1, Number(pagination?.totalPages || 1));
  const searchPagination = searchData?.pagination;
  const searchTotalPages = Math.max(
    1,
    Number(searchPagination?.totalPages || 1)
  );

  return (
    <section className="w-full ">
      <div className="rounded-2xl   p-6  md:p-8">
        <CompaniesHero query={q} onChange={setQ} />

        {!isSearching && (
          <>
            {/* Featured */}
            <div className="mt-10">
              <h2 className="text-[34px] font-extrabold text-[#0b1f33]">
                Featured Companies
              </h2>

              <div className="mt-4 grid gap-6 md:grid-cols-3">
                {featured.map((c) => (
                  <CompanyCard key={c.id} c={c} />
                ))}
              </div>

              {isFeaturedLoading && (
                <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">
                  Loading featured companies...
                </p>
              )}

              {isFeaturedError && (
                <p className="mt-6 text-center text-sm font-medium text-red-600">
                  {featuredError instanceof Error
                    ? featuredError.message
                    : "Failed to load featured companies."}
                </p>
              )}

              {!isFeaturedLoading &&
                !isFeaturedError &&
                featured.length === 0 && (
                  <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">
                    No featured companies found.
                  </p>
                )}
            </div>

            {/* All */}
            <div className="mt-10">
              <h2 className="text-[34px] font-extrabold text-[#0b1f33]">
                All Companies
              </h2>

              <div className="mt-5 grid gap-6 md:grid-cols-3">
                {allCompanies.map((c) => (
                  <CompanyCard key={c.id} c={c} />
                ))}
              </div>

              {isLoading && (
                <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">
                  Loading companies...
                </p>
              )}

              {isError && (
                <p className="mt-6 text-center text-sm font-medium text-red-600">
                  {error instanceof Error
                    ? error.message
                    : "Failed to load companies."}
                </p>
              )}

              {!isLoading && !isError && allCompanies.length === 0 && (
                <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">
                  No companies found.
                </p>
              )}

              {totalPages > 1 && (
                <div className="mt-14">
                  <CompaniesPagination
                    page={page}
                    totalPages={totalPages}
                    isLoading={isLoading || isFetching}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {isSearching && (
          <div className="mt-10">
            <h2 className="text-[34px] font-extrabold text-[#0b1f33]">
              Search Results
            </h2>


            <div className="mt-5 grid gap-6 md:grid-cols-3">
              {searchResults.map((c) => (
                <CompanyCard key={c.id} c={c} />
              ))}
            </div>

            {isSearchLoading && (
              <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">
                Searching companies...
              </p>
            )}

            {isSearchError && (
              <p className="mt-6 text-center text-sm font-medium text-red-600">
                {searchError instanceof Error
                  ? searchError.message
                  : "Failed to search companies."}
              </p>
            )}

            {!isSearchLoading &&
              !isSearchError &&
              searchResults.length === 0 && (
                <p className="mt-6 text-center text-sm font-medium text-[#0b1f33]/60">
                  No companies matched your search.
                </p>
              )}

            {searchTotalPages > 1 && (
              <div className="mt-14">
                <CompaniesPagination
                  page={searchPage}
                  totalPages={searchTotalPages}
                  isLoading={isSearchLoading || isSearchFetching}
                  onPageChange={setSearchPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function mapApiCompanyToCompany(
  company: {
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
  },
  index: number
): Company {
  return {
    id: company.id || company._id || String(index),
    name: company.companyName || company.name || "Unnamed Company",
    desc:
      company.highlight ||
      (company.industry
        ? `${company.industry} company based at ${
            company.address || "an unspecified location"
          }.`
        : "Company profile details are coming soon."),
    location: company.address || "Location not specified",
    rating: Number(company.rating || 0),
    reviews: Number(company.totalReviews || 0),
    cover: COMPANY_COVERS[index % COMPANY_COVERS.length],
    featured: company.isFeatured,
    industry: company.industry,
    tagline: company.highlight,
  };
}

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
          <span key={`ellipsis-${index}`} className="px-2">
            ...
          </span>
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

  if (currentPage > 3) {
    items.push("ellipsis");
  }

  for (let i = start; i <= end; i += 1) {
    items.push(i);
  }

  if (currentPage < totalPages - 2) {
    items.push("ellipsis");
  }

  items.push(totalPages);

  return items;
}
