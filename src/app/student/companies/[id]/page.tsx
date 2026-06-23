"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Loader2,
  MapPin,
  MessageCircle,
  Send,
  Star,
  ThumbsUp,
} from "lucide-react";
import StudentFooter from "@/components/shared/student-footer";
import useGetCompanyDetails from "./hooks/use-get-company-details";
import useGetCompanyInternships from "./hooks/use-get-company-internships";
import useGetCompanyReviews from "./hooks/use-get-company-reviews";
import useAddCompanyReview from "./hooks/use-add-company-review";
import { useRouter } from "next/navigation";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating) ? "text-[#f5b301]" : "text-[#d5dbe8]"
          }`}
          fill={i < Math.round(rating) ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default function CompanyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const {
    data: detailsData,
    error: detailsError,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useGetCompanyDetails(params.id);
  const router=useRouter()
  const { data: internshipsData, isLoading: isInternshipsLoading } =
    useGetCompanyInternships(params.id);
  const { data: reviewsData, isLoading: isReviewsLoading } =
    useGetCompanyReviews(params.id);
  const {
    mutateAsync: addReview,
    isPending: isAddingReview,
    error: addReviewError,
  } = useAddCompanyReview();

  if (isDetailsLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f3f7ff] px-4">
        <p className="text-sm font-semibold text-[#0b1f33]/70">
          Loading company...
        </p>
      </main>
    );
  }

  if (isDetailsError || !detailsData?.company) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f3f7ff] px-4">
        <Link
          href="/student/companies"
          className="text-sm font-semibold text-[#0a79c9]"
        >
          {detailsError instanceof Error
            ? detailsError.message
            : "Company not found. Back to companies"}
        </Link>
      </main>
    );
  }
  const company = detailsData.company;
  const imgUrl=company?.logo?.secure_url

  const internships = internshipsData?.internships ?? detailsData.internships;
  const reviews = reviewsData?.reviews ?? [];
  const averageRating = Number(
    reviewsData?.averageRating ?? company.stats?.rating ?? company.rating ?? 0
  );
  const totalReviews = Number(
    reviewsData?.totalReviews ??
      company.stats?.totalReviews ??
      company.totalReviews ??
      0
  );

  const companyId = company.id || company._id || params.id;
  const reviewInternshipId =
    internships[0]?._id || internships[0]?.id || params.id;
  const companyName = company.companyName || "Company";
  const size =
    company.numberOfEmployees?.from || company.numberOfEmployees?.to
      ? `${company.numberOfEmployees?.from ?? 0} - ${
          company.numberOfEmployees?.to ?? 0
        } employees`
      : "10 - 50 employees (dummy)";
  const sectors = company.industry
    ? [company.industry]
    : ["Software (dummy)", "Technology (dummy)"];
  const reviewBars = [5, 4, 3, 2, 1].map((star) => ({
    star,
    percent: totalReviews > 0 && Math.round(averageRating) === star ? 100 : 0,
  }));

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const comment = reviewComment.trim();
    if (!comment || reviewRating === 0 || !reviewInternshipId) {
      setReviewMessage("Add a comment and rating before submitting.");
      return;
    }

    setReviewMessage("");

    try {
      await addReview({
        companyId,
        internshipId: reviewInternshipId,
        rating: reviewRating,
        comment,
      });

      setReviewComment("");
      setReviewRating(0);
      setReviewMessage("Review submitted.");
    } catch {
      setReviewMessage("");
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f7ff] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/student/companies"
          className="mb-4 inline-flex items-center gap-2 text-[#0b1f33]/70 hover:text-[#0b1f33]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="rounded-2xl border border-[#0b1f33]/10 bg-white p-4 shadow-sm md:p-6">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#0b1f33]/10 pb-5 md:flex-row md:items-center">
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#e9f0ff] sm:h-20 sm:w-20">
                {imgUrl ? <img src={imgUrl}></img> : <Building2></Building2>}
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-2xl font-semibold text-[#0b1f33] sm:text-3xl md:text-4xl">
                  {companyName}
                </h1>
                <p className="text-[#0b1f33]/65">
                  {company.industry || "Technology company (dummy)"}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#0b1f33]/60">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" />{" "}
                    {company.address || "Address unavailable (dummy)"}
                  </span>
                  <span>{size}</span>
                </div>
              </div>
            </div>


          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <section className="space-y-5 md:col-span-2">
              <article className="rounded-xl border border-[#0b1f33]/10 p-4">
                <h2 className="text-2xl font-semibold text-[#0b1f33] sm:text-3xl">
                  About Us
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#0b1f33]/75">
                  {company.description ||
                    "We are a growing company building internship opportunities for students. (dummy)"}
                </p>
                <h3 className="mt-5 text-sm font-semibold text-[#0b1f33]">
                  INDUSTRY SECTORS
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sectors.map((sector) => (
                    <span
                      key={sector}
                      className="rounded-full bg-[#278adf] px-3 py-1 text-xs font-semibold text-white"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </article>

              <article className="rounded-xl border border-[#0b1f33]/10 p-4">
                <h2 className="text-2xl font-semibold text-[#0b1f33] sm:text-3xl">
                  Active Internships
                </h2>
                <div className="mt-4 space-y-3">
                  {internships.length === 0 && (
                    <p className="text-sm text-[#0b1f33]/60">
                      {isInternshipsLoading
                        ? "Loading internships..."
                        : "No internships found."}
                    </p>
                  )}

                  {internships.map((internship, index) => (
                    <div
                      key={internship.id || internship._id || index}
                      className="rounded-lg border border-[#0b1f33]/10 p-3"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-[#0b1f33]">
                            {internship.internshipTitle ?? 'Internship Title not found'} 
                          </h3>

                          <p className="mt-1 text-xs text-[#0b1f33]/50">
                            Posted {internship.postedAgo || "recently (dummy)"}
                          </p>
                        </div>
                        <button 
                        onClick={()=>{
                          router.push(`/student/internships/${internship._id}`)
                        }}
                        className="rounded bg-[#1689dc] px-3 py-1.5 text-xs font-semibold text-white">
                          Apply Now
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-xl border border-[#0b1f33]/10 p-4">
                <h2 className="text-2xl font-semibold text-[#0b1f33] sm:text-3xl">
                  Intern Reviews
                </h2>
                <div className="mt-4 rounded-lg border border-[#0b1f33]/10 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-5xl font-semibold text-[#0b1f33]">
                        {averageRating}
                      </p>
                      <Stars rating={averageRating} />
                      <p className="text-xs text-[#0b1f33]/55">
                        Based on {totalReviews} reviews
                      </p>
                    </div>
                    <div className="w-full flex-1 space-y-2">
                      {reviewBars.map((bar) => (
                        <div
                          key={bar.star}
                          className="flex items-center gap-3 text-xs text-[#0b1f33]/70"
                        >
                          <span className="w-3">{bar.star}</span>
                          <div className="h-2 flex-1 rounded-full bg-[#e8eefb]">
                            <div
                              className="h-2 rounded-full bg-[#2b8fd6]"
                              style={{ width: `${bar.percent}%` }}
                            />
                          </div>
                          <span className="w-8 text-right">
                            {bar.percent}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleReviewSubmit}
                  className="mt-4 rounded-lg border border-[#0b1f33]/10 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8f3ff] text-sm font-bold text-[#0a79c9]">
                      U
                    </div>
                    <div className="flex min-w-0 flex-1 items-center rounded-lg border border-[#0b1f33]/10 bg-white px-3">
                      <input
                        value={reviewComment}
                        onChange={(event) =>
                          setReviewComment(event.target.value)
                        }
                        placeholder="Add a comment"
                        className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#0b1f33] outline-none placeholder:text-[#0b1f33]/35"
                        disabled={isAddingReview}
                      />
                      <button
                        type="submit"
                        disabled={
                          isAddingReview ||
                          !reviewComment.trim() ||
                          reviewRating === 0
                        }
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#0a79c9] transition hover:bg-[#e8f3ff] disabled:cursor-not-allowed disabled:text-[#0b1f33]/25"
                        aria-label="Submit review"
                      >
                        {isAddingReview ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <div className="flex shrink-0 items-center justify-end gap-1">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const rating = index + 1;

                        return (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setReviewRating(rating)}
                            disabled={isAddingReview}
                            className="rounded p-0.5 text-[#d5dbe8] transition hover:text-[#f5b301] disabled:cursor-not-allowed"
                            aria-label={`Rate ${rating} star${
                              rating === 1 ? "" : "s"
                            }`}
                          >
                            <Star
                              className={`h-5 w-5 ${
                                rating <= reviewRating
                                  ? "text-[#f5b301]"
                                  : "text-[#d5dbe8]"
                              }`}
                              fill={
                                rating <= reviewRating ? "currentColor" : "none"
                              }
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {(reviewMessage || addReviewError) && (
                    <p
                      className={`mt-2 text-xs ${
                        addReviewError
                          ? "text-red-600"
                          : "text-[#0b1f33]/55"
                      }`}
                    >
                      {addReviewError instanceof Error
                        ? addReviewError.message
                        : reviewMessage}
                    </p>
                  )}
                </form>

                <div className="mt-4 space-y-3">
                  {reviews.length === 0 && (
                    <p className="rounded-lg border border-[#0b1f33]/10 p-4 text-sm text-[#0b1f33]/60">
                      {isReviewsLoading ? "Loading reviews..." : "No reviews yet."}
                    </p>
                  )}

                  {reviews.map((review, index) => (
                    <div
                      key={review.id || review._id || index}
                      className="rounded-lg border border-[#0b1f33]/10 p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-[#0b1f33]">
                            {review.name ||
                              review.user?.fullName ||
                              "Student (dummy)"}
                          </p>
                          <p className="text-xs text-[#0b1f33]/55">
                            {formatDate(review.date)}
                          </p>
                        </div>
                        <Stars rating={Number(review.rating || 0)} />
                      </div>
                      <p className="mt-2 text-sm text-[#0b1f33]/75">
                        {review.text ||
                          review.comment ||
                          "Review details unavailable. (dummy)"}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-[#0b1f33]/60">
                        <span className="inline-flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />{" "}
                          {review.likes ?? 0}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />{" "}
                          {review.comments ?? 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <aside className="rounded-xl border h-fit border-[#0b1f33]/10 p-4">
              <h2 className="text-xl font-semibold text-[#0b1f33] sm:text-2xl">
                COMPANY DETAILS
              </h2>
              <div className="mt-4 space-y-4 text-sm">
                <div>

                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0b1f33]/60">
                    HEADQUARTERS
                  </p>
                  <p className="text-[#0b1f33]/80">
                    {company.address || "Headquarters unavailable (dummy)"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0b1f33]/60">SIZE</p>
                  <p className="text-[#0b1f33]/80">{size}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0b1f33]/60">
                    FOUNDED
                  </p>
                  <p className="text-[#0b1f33]/80">
                    {formatYear(company.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0b1f33]/60">
                    ACTIVE INTERNSHIPS
                  </p>
                  <p className="text-[#0b1f33]/80">
                    {company.stats?.activeInternships ?? internships.length}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <StudentFooter />
      </div>
    </main>
  );
}

function formatDate(value?: string) {
  if (!value) return "Date unavailable (dummy)";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatYear(value?: string) {
  if (!value) return "2015 (dummy)";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(new Date(value));
}
