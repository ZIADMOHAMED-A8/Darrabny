"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  // Hero banner + search UI (no logic yet)

  return (
    <section className="mx-auto pt-10">
      <h1 className="text-2xl md:text-3xl font-semibold">
        Hi Adham, Welcome To Darrabny
      </h1>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="relative h-[260px] md:h-[34.81rem]">
          {/* Background Image */}
          <Image
            src="/hero-section.png"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-black/25" /> */}

          {/* Content */}
          <div className="relative z-10 grid h-full place-items-center px-4 text-center">
            <div className="text-[var(--ic-surface)]">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Find your dream <br /> internship
              </h2>
              <p className="mt-3">
                Explore thousands of internships and launch your career with
                InternLink.
              </p>

              {/* Search bar */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Input
                  placeholder="Search internships by title, company, or keyword"
                  className="w-full sm:w-[520px] bg-white/10 border-white/15 text-white placeholder:text-white/60"
                />
                <Button className="w-full sm:w-auto bg-[var(--ic-surface)] text-[var(--ic-ink)] hover:bg-[var(--ic-surface)]/90">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
