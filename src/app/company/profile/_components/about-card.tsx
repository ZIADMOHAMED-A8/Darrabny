import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { companyProfileDummy } from "../_data/company-profile.dummy";

export default function AboutCard() {
  // About section card

  const aboutText = companyProfileDummy.about;
  const sectors = companyProfileDummy.sectors;

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-card-bg)] text-[var(--ic-ink)] shadow-md h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-3">
          {/* Section title */}
          <h2 className="text-lg font-semibold">About Us</h2>

          {/* Edit icon (UI only) */}
          <button className="rounded-md p-2 text-slate-700 hover:bg-black/5">
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        {/* About text */}
        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">
          {aboutText}
        </p>

        {/* Industry sectors */}
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">
            Industry Sectors
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {sectors.map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#A3C1FF] px-4 py-2 text-sm text-[#001225] font-medium shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
