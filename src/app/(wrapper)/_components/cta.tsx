"use client"

import { Button } from "@/components/ui/button"

export default function Cta() {
  return (
    <section className="py-16 bg-muted/40 text-center">
      {/* العنوان */}
      <h2 className="text-3xl font-bold text-foreground mb-4">
        Ready to Start?
      </h2>

      {/* الوصف */}
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Join InternLink today and take the first step towards your dream career.
        Browse opportunities or post a job to find the perfect candidate.
      </p>

      {/* الأزرار */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button className="h-12 px-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
          Browse All Internships
        </Button>
        <Button
          variant="outline"
          className="h-12 px-8 rounded-lg border-primary text-primary hover:bg-primary/10"
        >
          View Company Profiles
        </Button>
      </div>
    </section>
  )
}
