import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, X } from "lucide-react"

export default function ReadyToStart() {
  // CTA section (buttons disabled for now)
  const year = new Date().getFullYear()

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
              Browse All Internships
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-md border-[#0b1f33]/15 bg-white px-7 text-[#0b1f33] hover:bg-[#0b1f33]/5"
            >
              View Company Profiles
            </Button>
          </div>
        </div>

        <footer className="mt-12 pb-8 md:mt-14">
          <div className="h-px w-full bg-[#0b1f33]/15" />

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-md bg-[var(--ds-primary)] text-[10px] font-extrabold text-white">
                  D
                </span>
                <span className="text-sm font-semibold text-[var(--ds-primary)]">
                  Darrabny
                </span>
              </Link>
              <p className="mt-3 text-xs text-[#0b1f33]/50">
                © {year} Darrabny. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-4 md:justify-end">
              <a
                href="#"
                aria-label="Facebook"
                className="text-[#0b1f33]/70 hover:text-[#0b1f33]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="X"
                className="text-[#0b1f33]/70 hover:text-[#0b1f33]"
              >
                <X className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-[#0b1f33]/70 hover:text-[#0b1f33]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[#0b1f33]/70 hover:text-[#0b1f33]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
