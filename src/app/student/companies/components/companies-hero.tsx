"use client";

import { Search } from "lucide-react";

export default function CompaniesHero({
  query,
  onChange,
}: {
  query: string;
  onChange: (v: string) => void;
}) {
  return (
    <header>
      <h1 className="text-3xl font-semibold tracking-tight text-[#0b1f33] sm:text-4xl md:text-5xl">Companies</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#0b1f33]/80 sm:text-base md:text-lg">
        Explore companies offering internships and find your perfect match.
      </p>

      <div className="mt-6 flex justify-center sm:mt-8">
        <div className="flex w-full max-w-[760px] items-center gap-2 rounded-lg border border-[#0b1f33]/10 bg-white px-4 py-3 shadow-sm">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search for companies by name, industry, or location"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
    </header>
  );
}
