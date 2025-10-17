"use client"

import InternshipCard from "@/components/shared/internship-card"
// import InternshipCard from "@/components/cards/InternshipCard"
import { featuredInternships } from "@/data/featured"

export default function FeaturedInternships() {
  return (
    <section className="py-16 bg-muted/30">
      <div className=" mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold mb-10">Featured Internships</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredInternships.map((item) => (
            <InternshipCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
