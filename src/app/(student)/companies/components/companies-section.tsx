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
    const all = COMPANIES.filter((c) => !c.featured);

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
    <section className=" mx-auto py-8">
      {/* Main container (same figma block) */}
      <div className="rounded-[12px] bg-[#9fb0bf]/55 p-10 shadow-[0_12px_28px_rgba(0,0,0,0.25)] backdrop-blur-sm">
        <CompaniesHero query={q} onChange={setQ} />

        {/* Featured */}
        <div className="mt-10">
          <h2 className="text-[20px] font-extrabold text-[#0b1f33]">
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
          <h2 className="text-[20px] font-extrabold text-[#0b1f33]">
            All Companies
          </h2>

          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="rounded-xl bg-[#013056] px-7 py-2.5 text-sm font-bold text-white hover:bg-[#013056]/90"
            >
              {showAll ? "Hide" : "See All"}
            </button>
          </div>

          {showAll && (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {filteredAll.map((c) => (
                <CompanyCard key={c.id} c={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
