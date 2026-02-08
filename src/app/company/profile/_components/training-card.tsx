import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { companyProfileDummy } from "../_data/company-profile.dummy"

function TrainingTile({
  title,
  desc,
  image,
}: {
  title: string
  desc: string
  image: string
}) {
  // Training tile (icon left)

  return (
    <div className="flex items-center gap-6 rounded-xl border border-black/10 bg-white/10 px-4 py-2 shadow-[0_10px_16px_rgba(0,0,0,0.18)] ">
      {/* Tile icon */}
      <div className="relative h-20 w-20 shrink-0">
        <Image src={image} alt="" fill className="object-contain" />
      </div>

      <div className="min-w-0">
        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-4 text-slate-800/90">{desc}</p>
      </div>
    </div>
  )
}

export default function TrainingCard() {
  // Training & mentorship section

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] text-[var(--ic-ink)] shadow-[0_14px_22px_rgba(0,0,0,0.14)] h-full">
      <CardContent className="p-7">
        {/* Section title */}
        <h2 className="text-lg font-semibold text-slate-900">
          Training & Mentorship
        </h2>

        {/* Tiles grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {companyProfileDummy.training.map((t) => (
            <TrainingTile
              key={t.title}
              title={t.title}
              desc={t.desc}
              image={t.image}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
