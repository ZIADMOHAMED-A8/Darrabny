import Image from "next/image";
import { MapPin, Users, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyProfileDummy } from "../_data/company-profile.dummy";
import CompanyTabs from "./company-tabs";

export default function CompanyHeader() {
  // Company header block (header + tabs)

  return (
    <section className="rounded-xl bg-[var(--ic-surface)] text-[var(--ic-ink)] overflow-hidden mx-auto">
      <div className="flex flex-col gap-8 p-7 md:flex-row md:items-stretch">
        {/* Company logo */}
        <div className="flex items-stretch">
          <div className="relative w-24 self-stretch overflow-hidden">
            <Image src={companyProfileDummy.logoImage} alt="" fill />
          </div>
        </div>

        <div className="flex-1">
          {/* Company name */}
          <h1 className="text-2xl font-semibold text-slate-900">
            {companyProfileDummy.name}
          </h1>

          {/* Company tagline */}
          <p className="mt-2 text-sm font-medium text-slate-600">
            {companyProfileDummy.tagline}
          </p>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {companyProfileDummy.location}
            </span>

            <span className="inline-flex items-center gap-1">
              <Users className="h-4 w-4" />
              {companyProfileDummy.size}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-black my-3 mx-6" />

      <div className="flex items-center justify-between gap-4 px-7 py-4">
        <CompanyTabs />

        <Button className="h-10 rounded-2xl bg-[#0474C4] px-4 text-lg font-semibold text-white shadow-md shadow-black/25 hover:bg-[#155DFC]/90">
          <Pencil className="mr-3 h-6 w-6" />
          Edit Profile
        </Button>
      </div>
    </section>
  );
}
