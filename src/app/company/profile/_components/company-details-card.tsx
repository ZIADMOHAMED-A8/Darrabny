import { Card, CardContent } from "@/components/ui/card"
import { Globe, Building2, CalendarDays, Users } from "lucide-react"
import { companyProfileDummy } from "../_data/company-profile.dummy"

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  // Single detail row

  return (
    <div className="flex items-start gap-3 rounded-xl border border-black/10 bg-white/40 p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 border border-black/10">
        {icon}
      </span>

      <div className="min-w-0">
        {/* Row label */}
        <p className="text-xs font-semibold text-slate-700">{label}</p>

        {/* Row value */}
        <p className="mt-1 text-sm leading-5 text-slate-800 break-words">
          {value}
        </p>
      </div>
    </div>
  )
}

export default function CompanyDetailsCard() {
  // Company details card

  const d = companyProfileDummy.details

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] text-[var(--ic-ink)] shadow-md">
      <CardContent className="p-6">
        {/* Section title */}
        <h2 className="text-lg font-semibold text-slate-900">Company Details</h2>

        {/* Details list */}
        <div className="mt-4 space-y-3">
          <DetailRow
            label="Website"
            value={d.website}
            icon={<Globe className="h-5 w-5 text-slate-700" />}
          />

          <DetailRow
            label="Headquarters"
            value={d.headquarters}
            icon={<Building2 className="h-5 w-5 text-slate-700" />}
          />

          <DetailRow
            label="Founded"
            value={d.founded}
            icon={<CalendarDays className="h-5 w-5 text-slate-700" />}
          />

          <DetailRow
            label="Company Size"
            value={d.size}
            icon={<Users className="h-5 w-5 text-slate-700" />}
          />
        </div>
      </CardContent>
    </Card>
  )
}
