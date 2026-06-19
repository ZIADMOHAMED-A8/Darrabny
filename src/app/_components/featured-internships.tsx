
"use client"
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import useGetRecommendedInternships from "../student/internships/hooks/useGetRecommendedInternships";

export default function FeaturedInternships() {


  const { data: featuredInternships, isLoading } = useGetRecommendedInternships()
  if (isLoading) return
  return (
    <section className="mx-auto py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/60 bg-white/50 px-5 py-8 shadow-[var(--ds-shadow)] backdrop-blur-sm md:px-10 md:py-10">
          <h2 className="text-center text-2xl font-bold text-[#063058] md:text-3xl">
            Featured Internships
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredInternships?.slice(0, 3).map((item) => (
              <Card
                key={item._id}
                className="overflow-hidden rounded-2xl border border-[var(--ds-border)] bg-white text-slate-900 shadow-[0_14px_34px_rgba(16,24,40,0.12)]"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={item.thumbnail || "/placeholder.png"}
                    alt={item.internshipTitle}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-base font-semibold text-[#0b1f33] md:text-lg">
                    {item.internshipTitle}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-[var(--ds-primary)]">
                    {item.companyId?.companyName}
                  </p>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--ds-muted)]">
                    {item.internshipDescription}
                  </p>

                  <Link
                    href={`/student/internships/${item._id}`}
                    className="mt-4 inline-block text-sm font-medium text-[var(--ds-primary)] hover:text-[var(--ds-primary-dark)]"
                  >
                    Learn More
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
