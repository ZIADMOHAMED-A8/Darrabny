"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Building2 } from "lucide-react";
import type { PartnerCompany } from "../actions/get-partners.action";

function CompanyInitials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colors = ["#1565C0", "#0F6E56", "#6A1B9A", "#C62828", "#E65100"];
  const index =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    colors.length;
  const bg = colors[index];

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
      style={{ background: bg }}
    >
      {initials}
    </div>
  );
}

export default function PartnerCard({
  company,
}: {
  company: PartnerCompany;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        {company.logo?.secure_url ? (
          <Image
            src={company.logo.secure_url}
            alt={company.companyName}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <CompanyInitials name={company.companyName} />
        )}

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-slate-800">
              {company.rating?.toFixed(1) || "0.0"}
            </span>
            <span className="text-xs text-slate-400">
              ({company.reviewCount?.toLocaleString() || 0})
            </span>
          </div>
          {company.isTopPartner && (
            <span className="text-xs font-semibold text-[#0A79C9]">
              Top Partner
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-3 text-base font-bold text-slate-900">
        {company.companyName}
      </h3>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Building2 size={12} />
          {company.industry || "N/A"}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          {company.location || "N/A"}
        </span>
      </div>

      {company.skills?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {company.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/university/profile/company_profile/${company.companyId}`}
        className="mt-4 block w-full rounded-lg border border-slate-200 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        View Profile
      </Link>
    </div>
  );
}
