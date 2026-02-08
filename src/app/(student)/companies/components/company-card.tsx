"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Company } from "../_data/companies.data";

export default function CompanyCard({ c }: { c: Company }) {
  return (
    <div className="overflow-hidden rounded-[12px] bg-[#dbeafe] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
      <div className="relative h-[140px] w-full bg-white">
        <Image src={c.cover} alt={c.name} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-extrabold text-[#0b1f33]">{c.name}</h3>
        <p className="mt-1 text-xs leading-5 text-[#0b1f33]/70 line-clamp-2">
          {c.desc}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-[#0b1f33]/75">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {c.location}
          </span>

          <span className="inline-flex items-center gap-1 font-semibold">
            <Star className="h-4 w-4 text-[#2196F3]" />
            {c.rating.toFixed(1)}
            <span className="text-[#0b1f33]/55">({c.reviews})</span>
          </span>
        </div>
      </div>
    </div>
  );
}
