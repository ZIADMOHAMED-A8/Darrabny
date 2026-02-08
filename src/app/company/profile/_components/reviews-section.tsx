import { Card, CardContent } from "@/components/ui/card";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { companyProfileDummy } from "../_data/company-profile.dummy";

function Stars({ value }: { value: number }) {
  // Star rating row

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(value);
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${filled ? "text-[#F5B301]" : "text-slate-300"}`}
            fill={filled ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
}

function RatingBar({ star, pct }: { star: number; pct: number }) {
  // Rating distribution bar

  return (
    <div className="flex items-center gap-4">
      <span className="w-6 text-xs text-slate-700">{star}</span>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E7EEF9]">
        <div
          className="h-full rounded-full bg-[#2B8FD6]"
          style={{ width: `${pct}%` }}
        />
      </div>

      <span className="w-10 text-right text-xs text-slate-700">{pct}%</span>
    </div>
  );
}

function ReviewCard({ r }: { r: any }) {
  // Single review card

  return (
    <div className="rounded-[10px] bg-[#C1D2EE] px-6 py-6 shadow-[0_10px_18px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-white/60" />

          <div>
            {/* Reviewer name */}
            <p className="text-sm font-semibold text-slate-900">{r.name}</p>
            <p className="mt-1 text-xs text-slate-700">{r.date}</p>
          </div>
        </div>

        <Stars value={r.rating} />
      </div>

      {/* Review text */}
      <p className="mt-4 text-sm leading-6 text-slate-700">{r.text}</p>

      {/* Review actions */}
      <div className="mt-5 flex items-center gap-6 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <ThumbsUp className="h-4 w-4" /> {r.likes}
        </span>
        <span className="inline-flex items-center gap-2">
          <MessageCircle className="h-4 w-4" /> {r.replies}
        </span>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  // Reviews section

  const summary = companyProfileDummy.reviewsSummary;
  const reviews = companyProfileDummy.reviews;

  return (
    <Card className="rounded-[10px] border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        {/* Section title */}
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Intern Reviews
        </h2>

        {/* Summary */}
        <div className="grid gap-6">
          <div className="rounded-[10px] bg-[#C1D2EE] px-6 py-5 shadow-[0_10px_18px_rgba(0,0,0,0.18)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              {/* Left rating block */}
              <div>
                <div className="flex flex-col items-center gap-1">
                  {/* الرقم الكبير */}
                  <span className="text-5xl font-bold text-slate-900">
                    {summary.rating}
                  </span>
                  {/* Stars */}
                  <Stars value={summary.rating} />

                  {/* Helper text */}
                  <p className="text-xs text-slate-700">
                    Based on {summary.total} reviews
                  </p>
                </div>
              </div>

              {/* Right bars */}
              <div className="flex-1 space-y-3">
                {summary.bars.map((b: any) => (
                  <RatingBar key={b.star} star={b.star} pct={b.pct} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews list */}
        <div className="mt-6 space-y-6">
          {reviews.map((r: any) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
