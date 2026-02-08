import { Button } from "@/components/ui/button"

export default function ReadyToStart() {
  // CTA section (buttons disabled for now)

  return (
    <section className="mx-auto pb-16">
      <div className="rounded-3xl bg-[var(--ic-surface)] text-[var(--ic-ink)] py-16 text-center shadow-lg">
        <h2 className="text-3xl font-semibold">Ready to Start?</h2>
        <p className="mt-3 text-slate-700">
          Join InternLink today and take the first step towards your dream career.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="bg-[var(--ic-header)] text-white hover:bg-[var(--ic-header)]/90">
            Browse All Internships
          </Button>
          <Button variant="outline" className="border-slate-300">
            View Company Profiles
          </Button>
        </div>
      </div>
    </section>
  )
}
