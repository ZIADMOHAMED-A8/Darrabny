import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Bell, Shield, ChevronRight } from "lucide-react"

function SettingsRow({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  // Single settings row

  return (
    <button className="w-full rounded-xl px-3 py-3 text-left hover:bg-black/5 transition flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 border border-black/10">
          {icon}
        </span>
        <span className="text-sm font-medium text-slate-800">{label}</span>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-500" />
    </button>
  )
}

export default function AccountSettingsCard() {
  // Account settings card (UI only)

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] text-[var(--ic-ink)] shadow-md">
      <CardContent className="p-6">
        {/* Section title */}
        <h2 className="text-lg font-semibold text-slate-900">Account Settings</h2>

        {/* Settings list */}
        <div className="mt-4 space-y-1">
          <SettingsRow
            label="Company Profile"
            icon={<Building2 className="h-5 w-5 text-slate-700" />}
          />
          <SettingsRow
            label="Manage Users"
            icon={<Users className="h-5 w-5 text-slate-700" />}
          />
          <SettingsRow
            label="Notifications"
            icon={<Bell className="h-5 w-5 text-slate-700" />}
          />
          <SettingsRow
            label="Security & Privacy"
            icon={<Shield className="h-5 w-5 text-slate-700" />}
          />
        </div>
      </CardContent>
    </Card>
  )
}
