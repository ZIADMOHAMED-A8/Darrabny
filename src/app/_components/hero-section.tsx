"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Search } from "lucide-react";

export default function HeroSection() {
  // Hero banner + search UI (no logic yet)

  return (
    <section className="mx-auto pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold text-[#063058] md:text-3xl">
          Hi Adham, Welcome To Darrabny
        </h1>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/60 bg-white/50 px-6 py-16 shadow-[var(--ds-shadow)] backdrop-blur-sm md:px-12 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-extrabold leading-tight text-[#063058] md:text-6xl">
              Find your dream <br /> internship
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium text-[var(--ds-muted)] md:text-base">
              Explore thousands of internships and launch your career with
              InternLink.
            </p>

            <div className="mx-auto mt-8 w-full max-w-2xl">

            </div>
          </div>

          <div className="absolute right-10 top-1/2 hidden -translate-y-2 md:block">

          </div>
        </div>
      </div>
    </section>
  );
}
