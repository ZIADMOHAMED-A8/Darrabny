import Footer from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
Link
export default function ReadyToStart() {
  return (
    <section className="mx-auto pb-10 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/60 bg-white/55 py-12 text-center shadow-[var(--ds-shadow)] backdrop-blur-sm md:py-14">
          <h2 className="text-3xl font-bold text-[#0b1f33]">Ready to Start?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--ds-muted)] md:text-base">
            Join InternLink today and take the first step towards your dream career.
            Browse opportunities or post a job to find the perfect candidate.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button className="h-10 rounded-md bg-[var(--ic-header)] px-7 text-white hover:bg-[var(--ic-header)]/90">
              <Link href={'/student/internships'} >Browse All Internships</Link>
            </Button>
         
          </div>
        </div>
      </div>

      <Footer className="mt-12 md:mt-14" />
    </section>
  )
}
