import { MoreVertical, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { universityHubDummy } from "../_data/university-hub.dummy"

function Avatar({ text, tone }: { text: string; tone: "pink" | "indigo" }) {
  // Simple avatar (static)

  const toneCls =
    tone === "pink"
      ? "bg-rose-200 text-rose-700"
      : "bg-indigo-200 text-indigo-700"

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${toneCls}`}
    >
      {text}
    </div>
  )
}

export default function HubTable() {
  // Interns table (static)

  return (
    <Card className="rounded-2xl border-0 bg-[#C1D2EE] shadow-[0_14px_22px_rgba(0,0,0,0.18)]">
      <CardContent className="overflow-x-auto p-0">
        <div className="min-w-[960px]">
        {/* Header row */}
        <div className="grid grid-cols-12 gap-4 border-b border-black/10 px-6 py-4 text-xs font-semibold text-slate-800">
          <div className="col-span-3">Intern Details</div>
          <div className="col-span-2">University/Faculty</div>
          <div className="col-span-3">Training Program</div>
          <div className="col-span-2">Performance</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-black/10">
          {universityHubDummy.rows.map((r) => {
            const perfBarColor =
              r.performanceLabel === "Good"
                ? "[&>div]:bg-emerald-500"
                : "[&>div]:bg-yellow-400"

            const statusCls =
              r.statusLabel === "Active"
                ? "bg-emerald-500/90 text-white"
                : "bg-lime-300 text-slate-900"

            const perfTextCls =
              r.performanceLabel === "Good"
                ? "text-emerald-600"
                : "text-yellow-600"

            return (
              <div
                key={r.id}
                className="grid grid-cols-12 items-center gap-4 px-6 py-4"
              >
                {/* Intern details */}
                <div className="col-span-3 flex items-center gap-4">
                  <Avatar text={r.avatarText} tone={r.avatarColor} />

                  <div>
                    {/* Name */}
                    <p className="text-sm font-semibold text-slate-900">
                      {r.internName}
                    </p>
                    {/* Code */}
                    <p className="text-xs text-slate-600">
                      ID: {r.internCode}
                    </p>
                  </div>
                </div>

                {/* University */}
                <div className="col-span-2">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="mt-0.5 h-4 w-4 text-slate-700" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {r.university}
                      </p>
                      <p className="text-xs text-slate-600">{r.faculty}</p>
                    </div>
                  </div>
                </div>

                {/* Program */}
                <div className="col-span-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {r.program}{" "}
                    <span className="font-medium text-slate-600">
                      {r.programWeek}
                    </span>
                  </p>
                </div>

                {/* Performance */}
                <div className="col-span-2">
                  <p className={`text-sm font-semibold ${perfTextCls}`}>
                    {r.performanceLabel}
                  </p>

                  <div className="mt-2">
                    <Progress
                      value={r.performanceValue}
                      className={`h-2 bg-black/10 ${perfBarColor}`}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-1 flex justify-center">
                  <Badge className={`rounded-md px-3 py-1 text-xs ${statusCls}`}>
                    {r.statusLabel}
                  </Badge>
                </div>

                {/* Action */}
                <div className="col-span-1 flex justify-center">
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/40 text-slate-700 hover:bg-white/60">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        </div>
      </CardContent>
    </Card>
  )
}
