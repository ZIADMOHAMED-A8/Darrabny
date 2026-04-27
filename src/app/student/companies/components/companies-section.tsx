"use client";

import { useMemo, useState } from "react";
import CompaniesHero from "./companies-hero";
import CompanyCard from "./company-card";
import { COMPANIES } from "../_data/companies.data";

export default function CompaniesSection() {
  const [showAll, setShowAll] = useState(false);
  const [q, setQ] = useState("");

  const featured = useMemo(() => COMPANIES.filter((c) => c.featured), []);

  const filteredAll = useMemo(() => {
    const text = q.trim().toLowerCase();
    const all = COMPANIES;

    if (!text) return all;

    return all.filter((c) => {
      return (
        c.name.toLowerCase().includes(text) ||
        c.desc.toLowerCase().includes(text) ||
        c.location.toLowerCase().includes(text) ||
        (c.industry ?? "").toLowerCase().includes(text)
      );
    });
  }, [q]);

  return (
    <section className="w-full py-4 md:py-6">
      <div className="rounded-2xl border border-[#0b1f33]/10 bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.08)] md:p-8">
        <CompaniesHero query={q} onChange={setQ} />

        {/* Featured */}
        <div className="mt-10">
          <h2 className="text-[34px] font-extrabold text-[#0b1f33]">
            Featured Companies
          </h2>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {featured.map((c) => (
              <CompanyCard key={c.id} c={c} />
            ))}
          </div>
        </div>

        {/* All */}
        <div className="mt-10">
          <h2 className="text-[34px] font-extrabold text-[#0b1f33]">
            All Companies
          </h2>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {(showAll ? filteredAll : filteredAll.slice(0, 3)).map((c) => (
              <CompanyCard key={c.id} c={c} />
            ))}
          </div>

          {filteredAll.length > 3 && (
            <div className="mt-14 flex justify-center">
              <button
                onClick={() => setShowAll((s) => !s)}
                className="rounded-full bg-[#013e6f] px-8 py-3 text-sm font-bold text-white hover:bg-[#013e6f]/90"
              >
                {showAll ? "Show Less" : "See All"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
