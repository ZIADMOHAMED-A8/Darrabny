import Image from "next/image";
import { Button } from "@/components/ui/button";
import { companyProfileDummy } from "../_data/company-profile.dummy";

function InternshipRow({
  title,
  meta,
  tags,
  logoImage,
  actionText,
}: {
  title: string;
  meta: string[];
  tags: string[];
  logoImage: string;
  actionText: string;
}) {
  // Internship row (UI only)

  return (
    <div className="rounded-[10px] bg-[#C1D2EE] px-6 py-5 shadow-[0_10px_18px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          {/* Company logo */}
          <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white/50">
            <Image src={logoImage} alt="" fill className="object-cover" />
          </div>

          <div className="min-w-0">
            {/* Internship title */}
            <h3 className="truncate font-medium text-[20px] leading-[20px] text-black">
              {title}
            </h3>

            {/* Meta line */}
            <div className="mt-4 flex flex-wrap gap-12 text-sm font-semibold text-black/80">
              {meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Apply button */}
        <Button className="h-10 rounded-[8px] bg-[#0B73C6] px-6 text-white shadow-[0_8px_14px_rgba(0,0,0,0.25)] hover:bg-[#0B73C6]/90">
          {actionText}
        </Button>
      </div>

      {/* Divider */}
      <div className="mt-4 h-px w-full bg-black/60" />

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-6">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex h-[38px] items-center rounded-[10px] bg-white px-5 text-sm text-[#0B73C6] shadow-[0_8px_14px_rgba(0,0,0,0.20)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ActiveInternshipsCard() {
  // Active internships section (UI only)

  const items = companyProfileDummy.activeInternships;

  return (
    <section className="h-full">
      <div className="flex items-center justify-between">
        {/* Section title */}
        <h2 className="text-2xl font-semibold text-white">
          Active Internships
        </h2>

        {/* View all (UI only) */}
        <button className="text-sm font-semibold text-[#0B73C6] hover:underline">
          View all →
        </button>
      </div>

      <div className="mt-4 space-y-9">
        {items.map((x) => (
          <InternshipRow
            key={x.id}
            title={x.title}
            meta={[...x.meta]}
            tags={[...x.tags]}
            logoImage={x.logoImage}
            actionText={x.actionText}
          />
        ))}
      </div>
    </section>
  );
}
