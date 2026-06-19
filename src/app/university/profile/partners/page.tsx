"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { usePartners } from "./hooks/use-partners";
import PartnerCard from "./components/partner-card";

export default function UniversityPartnersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch, isFetching } =
    usePartners(page);

  const companies = data?.companies || [];
  const pagination = data?.pagination || {
    totalCompanies: 0,
    currentPage: 1,
    totalPages: 0,
  };

  const pageNumbers = Array.from(
    { length: Math.min(pagination.totalPages, 5) },
    (_, i) => i + 1
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6 md:p-10">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1B2B49]">
              Company Partners
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Ranked by algorithm based on{" "}
              <span className="font-semibold text-slate-700">
                15 core technical competencies
              </span>{" "}
              and cultural fit metrics.
            </p>
          </div>
 
        </div>

        {/* Content */}
        {isError ? (
          <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-lg font-bold text-red-700">
              Failed to load partners
            </p>
            <p className="mt-1 text-sm text-red-600">
              {error instanceof Error
                ? error.message
                : "Something went wrong."}
            </p>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isFetching ? "Retrying..." : "Try again"}
            </button>
          </div>
        ) : isLoading ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[220px] animate-pulse rounded-xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-16 text-center">
            <p className="text-lg font-semibold text-slate-600">
              No partner companies found
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Partners will appear here once available.
            </p>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <PartnerCard key={company._id} company={company} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Showing page {pagination.currentPage} of{" "}
                  {pagination.totalCompanies} partner companies
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {pageNumbers.map((num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                        num === page
                          ? "bg-[#0A79C9] text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(pagination.totalPages, p + 1))
                    }
                    disabled={page === pagination.totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
