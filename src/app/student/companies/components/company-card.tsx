"use client";

import Image from "next/image";
import Link from "next/link";
import { Company } from "../_data/companies.data";

export default function CompanyCard({ c }: { c: Company }) {
  return (
    <Link
      href={`/companies/${c.id}`}
      className="overflow-hidden rounded-2xl border border-[#0b1f33]/10 bg-white shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition hover:-translate-y-0.5"
    >
      <div className="relative h-[165px] w-full bg-[#f2f5fc]">
        <Image src={c.cover} alt={c.name} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h3 className="text-2xl font-extrabold leading-7 text-[#0b1f33]">{c.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[#0b1f33]/70 line-clamp-2">{c.desc}</p>
      </div>
    </Link>
  );
}
