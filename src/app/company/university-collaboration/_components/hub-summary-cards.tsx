import { Card, CardContent } from "@/components/ui/card"
import { FileText, RefreshCcw, Building2 } from "lucide-react"
import { universityHubDummy } from "../_data/university-hub.dummy"

function IconByKey({ k }: { k: string }) {
  // Icon mapper (static)

  if (k === "reports") return <FileText className="h-5 w-5 text-slate-700" />
  if (k === "training") return <RefreshCcw className="h-5 w-5 text-slate-700" />
  return <Building2 className="h-5 w-5 text-slate-700" />
}

export default function HubSummaryCards() {
  // Summary cards (static)

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {universityHubDummy.cards.map((c) => (
        <Card
          key={c.key}
          className="rounded-2xl border-0 bg-[#C1D2EE] shadow-[0_14px_22px_rgba(0,0,0,0.18)]"
        >
          <CardContent className="flex items-center gap-4 p-6">
            {/* Left icon bubble */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/60">
              <IconByKey k={c.key} />
            </div>

            <div>
              {/* Card title */}
              <p className="text-xs font-semibold text-slate-800">{c.title}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {c.big}
              </p>
              <p className="mt-1 text-xs text-slate-600">{c.small}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
