import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, MapPin, MessageCircle, Star, ThumbsUp } from "lucide-react";
import StudentFooter from "@/components/shared/student-footer";
import { COMPANY_PROFILES } from "../_data/company-pages.dummy";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.round(rating) ? "text-[#f5b301]" : "text-[#d5dbe8]"}`}
          fill={i < Math.round(rating) ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default function CompanyDetailsPage({ params }: { params: { id: string } }) {
  const profile = COMPANY_PROFILES[params.id];
  if (!profile) return notFound();

  return (
    <main className="min-h-screen bg-[#f3f7ff] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/companies" className="mb-4 inline-flex items-center gap-2 text-[#0b1f33]/70 hover:text-[#0b1f33]">
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="rounded-2xl border border-[#0b1f33]/10 bg-white p-4 shadow-sm md:p-6">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#0b1f33]/10 pb-5 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-xl bg-[#e9f0ff]">
                <Building2 className="h-9 w-9 text-[#0a79c9]" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-[#0b1f33]">{profile.name}</h1>
                <p className="text-[#0b1f33]/65">{profile.tagline}</p>
                <div className="mt-2 flex items-center gap-4 text-sm text-[#0b1f33]/60">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {profile.location}
                  </span>
                  <span>{profile.followers} followers</span>
                  <span>{profile.size}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="rounded-md bg-[#1787d8] px-5 py-2 text-sm font-semibold text-white">+ Follow</button>
              <Link href={`/companies/${profile.id}/contact`} className="rounded-md border border-[#0b1f33]/15 px-5 py-2 text-sm font-semibold text-[#0b1f33]">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <section className="space-y-5 md:col-span-2">
              <article className="rounded-xl border border-[#0b1f33]/10 p-4">
                <h2 className="text-3xl font-bold text-[#0b1f33]">About Us</h2>
                <p className="mt-3 text-sm leading-7 text-[#0b1f33]/75">{profile.about}</p>
                <h3 className="mt-5 text-sm font-extrabold text-[#0b1f33]">INDUSTRY SECTORS</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.sectors.map((sector) => (
                    <span key={sector} className="rounded-full bg-[#278adf] px-3 py-1 text-xs font-semibold text-white">
                      {sector}
                    </span>
                  ))}
                </div>
              </article>

              <article className="rounded-xl border border-[#0b1f33]/10 p-4">
                <h2 className="text-3xl font-bold text-[#0b1f33]">Active Internships</h2>
                <div className="mt-4 space-y-3">
                  {profile.internships.map((internship) => (
                    <div key={internship.id} className="rounded-lg border border-[#0b1f33]/10 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-[#0b1f33]">{internship.title}</h3>
                          <p className="text-xs text-[#0b1f33]/60">
                            {internship.location} • {internship.duration} • {internship.paid}
                          </p>
                        </div>
                        <button className="rounded bg-[#1689dc] px-3 py-1.5 text-xs font-semibold text-white">Apply Now</button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {internship.tags.map((tag) => (
                          <span key={tag} className="rounded bg-[#f0f6ff] px-2 py-0.5 text-xs text-[#0b1f33]/70">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-xl border border-[#0b1f33]/10 p-4">
                <h2 className="text-3xl font-bold text-[#0b1f33]">Intern Reviews</h2>
                <div className="mt-4 rounded-lg border border-[#0b1f33]/10 p-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-5xl font-bold text-[#0b1f33]">{profile.reviewsScore}</p>
                      <Stars rating={profile.reviewsScore} />
                      <p className="text-xs text-[#0b1f33]/55">Based on {profile.reviewsCount} reviews</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {profile.reviewBars.map((bar) => (
                        <div key={bar.star} className="flex items-center gap-3 text-xs text-[#0b1f33]/70">
                          <span className="w-3">{bar.star}</span>
                          <div className="h-2 flex-1 rounded-full bg-[#e8eefb]">
                            <div className="h-2 rounded-full bg-[#2b8fd6]" style={{ width: `${bar.percent}%` }} />
                          </div>
                          <span className="w-8 text-right">{bar.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {profile.reviews.map((review) => (
                    <div key={review.id} className="rounded-lg border border-[#0b1f33]/10 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[#0b1f33]">{review.name}</p>
                          <p className="text-xs text-[#0b1f33]/55">{review.date}</p>
                        </div>
                        <Stars rating={review.rating} />
                      </div>
                      <p className="mt-2 text-sm text-[#0b1f33]/75">{review.text}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-[#0b1f33]/60">
                        <span className="inline-flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" /> {review.likes}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" /> {review.comments}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <aside className="rounded-xl border border-[#0b1f33]/10 p-4">
              <h2 className="text-2xl font-bold text-[#0b1f33]">COMPANY DETAILS</h2>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-[#0b1f33]/60">WEBSITE</p>
                  <p className="text-[#0b1f33]/80">{profile.website}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0b1f33]/60">HEADQUARTERS</p>
                  <p className="text-[#0b1f33]/80">{profile.headquarters}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0b1f33]/60">SIZE</p>
                  <p className="text-[#0b1f33]/80">{profile.size}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0b1f33]/60">FOUNDED</p>
                  <p className="text-[#0b1f33]/80">{profile.founded}</p>
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
