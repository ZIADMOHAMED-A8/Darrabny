"use client";

import { useState } from "react";
import { X, CheckCircle2, Star, Bookmark } from "lucide-react";
import { useInternshipDetails } from "./hooks/use-internship-details";
import { useParams } from "next/navigation";
import { useInternshipReviews } from "./hooks/use-internship-reviews";
import { useRouter } from "next/navigation";
import ApplyModal from "@/app/student/internships/[id]/_components/apply-modal";

type InternshipReview = {
  _id?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
  userId?: {
    firstName?: string;
    lastName?: string;
  };
};

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-[#374151]">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0a79c9]" />
      <span>{text}</span>
    </li>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-[18px] font-bold text-[#0b1f33] mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default function InternshipDetailsPanel() {
  const [tab, setTab] = useState<"overview" | "reviews">("overview");
  const [applyOpen, setApplyOpen] = useState(false);
  const router = useRouter();

  const { id } = useParams() as { id: string };

  const { data, isLoading, isError } = useInternshipDetails(id);
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useInternshipReviews(id);

  if (isLoading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (isError || !data) return <div className="p-10 text-center text-red-500">Failed to load</div>;

  // ── Mapped fields ──
  const title = data.internshipTitle || data.internshipTittle;
  const company = data.companyId?.companyName;
  const thumbnail = data.thumbnail || "/placeholder.png";

  const workMode =
    data.internshipLocation === "onsite"
      ? "On-site"
      : data.internshipLocation === "hybrid"
      ? "Hybrid"
      : "Remote";

  const workingTime = data.workingTime ?? "Full-time";
  const duration = `${data.durationInMonths} months`;

  const postedAt = data.createdAt
    ? (() => {
        const diff = Math.floor(
          (Date.now() - new Date(data.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        );
        return diff === 0 ? "Today" : diff === 1 ? "1 day ago" : `${diff} days ago`;
      })()
    : null;

  // ── Reviews ──
  const rating = reviewsData?.averageRating || 0;
  const totalReviews = reviewsData?.totalReviews || 0;
  const reviews: InternshipReview[] = Array.isArray(reviewsData)
    ? reviewsData
    : reviewsData?.data || [];

  return (
    <>
      <div className="w-full max-w-4xl mx-auto py-10 space-y-4">

        {/* ── Job Card (above detail panel) ── */}
        <div className="flex items-center gap-4 px-4 py-8 border border-[#E5E7EB] rounded-2xl bg-white shadow-sm">
          <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-[#F3F4F6] shrink-0">
            <img src={thumbnail} alt={company} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#6B7280]">{company}</p>
            <h2 className="text-[17px] font-bold text-[#0b1f33] mt-0.5 truncate">{title}</h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1">
                {/* location pin */}
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {workMode}
              </span>
              <span className="text-[#D1D5DB]">·</span>
              <span className="flex items-center gap-1">
                {/* briefcase */}
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path strokeLinecap="round" d="M16 3v4M8 3v4M2 11h20" />
                </svg>
                {workingTime}
              </span>
              <span className="text-[#D1D5DB]">·</span>
              <span className="flex items-center gap-1">
                {/* clock */}
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duration}
              </span>
            </div>
          </div>

   
        </div>

        {/* ── Detail Panel ── */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm relative">

          {/* Close */}
          <button
            onClick={() => router.back()}
            className="absolute right-6 top-6 text-[#9CA3AF] hover:text-[#0b1f33] transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="px-10 pt-10">
            {/* Title row */}
            <h1 className="text-[28px] font-extrabold text-[#0b1f33] pr-10">{title}</h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#6B7280]">
              <span>{company}</span>
              <span className="text-[#D1D5DB]">|</span>
              <span>{workMode}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0a79c9] text-white text-xs font-semibold">
                {workMode}
              </span>
              {postedAt && <span>Posted {postedAt}</span>}
            </div>

            {/* Tabs */}
            <div className="mt-7 flex gap-6 border-b border-[#E5E7EB]">
              {(["overview", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2.5 text-sm capitalize transition ${
                    tab === t
                      ? "border-b-2 border-[#0a79c9] text-[#0a79c9] font-medium"
                      : "text-[#6B7280] hover:text-[#0b1f33]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="px-10 pb-10 pt-8">

            {/* ── OVERVIEW ── */}
            {tab === "overview" && (
              <>
                <Section title="About the Internship">
                  <p className="text-[15px] text-[#374151] leading-7">
                    {data.internshipDescription}
                  </p>
                </Section>

                {data.technicalSkills?.length > 0 && (
                  <Section title="Responsibilities">
                    <ul className="grid md:grid-cols-2 gap-3">
                      {data.technicalSkills.map((s: string, i: number) => (
                        <CheckItem key={i} text={s} />
                      ))}
                    </ul>
                  </Section>
                )}

                {data.softSkills?.length > 0 && (
                  <Section title="Requirements">
                    <ul className="grid md:grid-cols-2 gap-3">
                      {data.softSkills.map((s: string, i: number) => (
                        <CheckItem key={i} text={s} />
                      ))}
                    </ul>
                  </Section>
                )}

                <Section title="Company Information">
                  <p className="text-[15px] text-[#374151] leading-7">
                    {data.companyId?.companyName} is a company offering this internship opportunity.
                  </p>
                </Section>
              </>
            )}

            {/* ── REVIEWS ── */}
            {tab === "reviews" && (
              <div className="space-y-6">
                {reviewsLoading && (
                  <div className="text-center text-gray-500 py-8">Loading reviews...</div>
                )}
                {reviewsError && (
                  <div className="text-center text-red-500 py-8">Failed to load reviews</div>
                )}

                {!reviewsLoading && !reviewsError && (
                  <>
                    {/* Summary */}
                    <div className="rounded-xl border border-[#E5E7EB] p-6">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-5xl font-extrabold text-[#0b1f33]">{rating}</div>
                          <div className="flex mt-2 gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.round(rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-200 fill-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm mt-2 text-gray-400">
                            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {reviews.length === 0 && (
                      <div className="text-center text-gray-400 py-8">No reviews yet</div>
                    )}

                    {reviews.map((r) => (
                      <div
                        key={r._id || `${r.userId?.firstName}-${r.createdAt}`}
                        className="rounded-xl border border-[#E5E7EB] p-6"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-[#0b1f33]">
                              {r.userId?.firstName} {r.userId?.lastName}
                            </p>
                            <p className="text-sm text-gray-400 mt-0.5">
                              {r.createdAt
                                ? new Date(r.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "Date unavailable"}
                            </p>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Number(r.rating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-200 fill-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-4 text-[15px] text-[#374151] leading-7">{r.comment}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* ── Actions ── */}
            <div className="mt-10 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setApplyOpen(true)}
                className="px-6 py-2 bg-[#0a79c9] text-white rounded-lg text-sm hover:bg-[#0868ae] transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <ApplyModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        internshipId={id}
        internship={{
          title: String(title || "Internship"),
          company: String(company || "Unknown Company"),
          image: String(thumbnail),
        }}
      />
    </>
  );
}