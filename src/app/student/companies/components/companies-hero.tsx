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
      <h1 className="text-[34px] font-extrabold text-[#0b1f33]">Companies</h1>
      <p className="mt-1 text-sm text-[#0b1f33]/70">
        Explore companies offering internships and find your perfect match.
      </p>

      <div className="mt-6 flex justify-center">
        <div className="flex w-full max-w-[620px] items-center gap-2 rounded-md bg-white px-3 py-2 shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
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
