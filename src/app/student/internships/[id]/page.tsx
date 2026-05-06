"use client";

import { useState } from "react";
import { X, CheckCircle2, Star } from "lucide-react";
import { useInternshipDetails } from "./hooks/use-internship-details";
import { useParams } from "next/navigation";
import { useInternshipReviews } from "./hooks/use-internship-reviews";
import { useRouter } from 'next/navigation';
import ApplyModal from "@/app/(student)/internships/[id]/_components/apply-modal";

export default function InternshipDetailsPanel() {
  const [tab, setTab] = useState<"overview" | "reviews">("overview");
  const [applyOpen, setApplyOpen] = useState(false);
  const router = useRouter();

  const { id } = useParams() as { id: string };

  const {
    data,
    isLoading,
    isError,
  } = useInternshipDetails(id);

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useInternshipReviews(id);

  // ================= LOADING / ERROR (MAIN) =================
  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="p-10 text-center">Failed to load</div>;
  }

  // ================= MAPPING =================
  const title = data.internshipTitle || data.internshipTittle;
  const company = data.companyId?.companyName;
  const image = data.thumbnail || "/placeholder.png";

  const workMode =
    data.internshipLocation === "onsite"
      ? "On-site"
      : data.internshipLocation === "hybrid"
      ? "Hybrid"
      : "Remote";

  const duration = `${data.durationInMonths} months`;

  // reviews
  const rating = reviewsData?.averageRating || 0;
  const totalReviews = reviewsData?.totalReviews || 0;
  const reviews = Array.isArray(reviewsData) ? reviewsData : reviewsData?.data || [];

  return (
    <>
      <div className="w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-[#0b1f33]/12 bg-white shadow-[0_22px_70px_rgba(16,24,40,0.16)] relative">

      {/* Close */}
      <button onClick={()=>{
        router.back()
      }} className="absolute right-6 top-6 text-[#0b1f33]/60 hover:text-[#0b1f33]">
        <X className="w-7 h-7" />
      </button>

      <div className="px-10 pt-10">

        <h1 className="text-3xl font-extrabold text-[#0b1f33]">
          {title}
        </h1>

        <div className="mt-3 flex items-center gap-3 text-sm text-[#0b1f33]/60">
          <span>{company}</span>
          <span>|</span>
          <span>{workMode}</span>
          <span className="px-2 py-0.5 rounded-full bg-[#5865d7] text-white text-xs font-semibold">
            {workMode}
          </span>
          <span>{duration}</span>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-6 border-b">
          <button
            onClick={() => setTab("overview")}
            className={`pb-2 ${
              tab === "overview"
                ? "border-b-2 border-[#0a79c9] text-[#0a79c9]"
                : "text-[#0b1f33]/55"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setTab("reviews")}
            className={`pb-2 ${
              tab === "reviews"
                ? "border-b-2 border-[#0a79c9] text-[#0a79c9]"
                : "text-[#0b1f33]/55"
            }`}
          >
            Reviews
          </button>
        </div>

        <div className="mt-4 h-px w-full bg-[#0b1f33]/10" />
      </div>

      <div className="px-10 pb-10 pt-8">

        {/* ================= OVERVIEW ================= */}
        {tab === "overview" && (
          <>
            <h2 className="text-xl font-bold text-[#0b1f33]">
              About the Internship
            </h2>

            <p className="mt-3 text-[#0b1f33]/70 leading-7">
              {data.internshipDescription}
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-12">

              {/* Technical */}
              <div>
                <h3 className="text-xl font-bold">Technical Skills</h3>
                <ul className="mt-5 space-y-4">
                  {data.technicalSkills?.map((s: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="text-[#0a79c9]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Soft */}
              <div>
                <h3 className="text-xl font-bold">Soft Skills</h3>
                <ul className="mt-5 space-y-4">
                  {data.softSkills?.map((s: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="text-[#0a79c9]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </>
        )}

        {/* ================= REVIEWS ================= */}
        {tab === "reviews" && (
          <div className="space-y-8">

            {/* 🔄 Loading */}
            {reviewsLoading && (
              <div className="text-center text-gray-500">
                Loading reviews...
              </div>
            )}

            {/* ❌ Error */}
            {reviewsError && (
              <div className="text-center text-red-500">
                Failed to load reviews
              </div>
            )}

            {/* ✅ Data */}
            {!reviewsLoading && !reviewsError && (
              <>
                {/* Summary */}
                <div className="rounded-2xl border border-[#0b1f33]/10 p-6">
                  <div className="grid md:grid-cols-[200px_1fr] gap-6 items-center">

                    <div>
                      <div className="text-5xl font-extrabold">
                        {rating}
                      </div>

                      <div className="flex mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round(rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <div className="text-sm mt-2 text-gray-500">
                        Based on {totalReviews} reviews
                      </div>
                    </div>

                    <div className="text-sm text-gray-400">
                      
                    </div>
                  </div>
                </div>

                {/* Empty state */}
                {reviews.length === 0 && (
                  <div className="text-center text-gray-500">
                    No reviews yet
                  </div>
                )}

                {/* Reviews list */}
                {reviews.map((r: any) => (
                  <div
                    key={r._id}
                    className="rounded-2xl border border-[#0b1f33]/10 p-6"
                  >
                    <div className="flex justify-between items-start">

                      <div>
                        <div className="font-semibold">
                          {r.userId?.firstName} {r.userId?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < r.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                    </div>

                    <p className="mt-4 text-[#0b1f33]/70">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-12 flex justify-end gap-3">
          <button className="px-6 py-2 border rounded-md">
            Save
          </button>
          <button
            type="button"
            onClick={() => setApplyOpen(true)}
            className="px-6 py-2 bg-[#0a79c9] text-white rounded-md"
          >
            Apply Now
          </button>
        </div>

      </div>
    </div>

      <ApplyModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        internship={{
          title: String(title || "Internship"),
          company: String(company || "Unknown Company"),
          image: String(image),
        }}
      />
    </>
  );
}
