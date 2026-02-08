// app/company/candidates/profile/_components/earned-badges-card.tsx
import { Card, CardContent } from "@/components/ui/card";
import { candidateProfileDummy } from "../_data/candidate-profile.dummy";

export default function EarnedBadgesCard() {
  const b = candidateProfileDummy.earnedBadges;

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-slate-900">{b.title}</p>
          <p className="text-xs text-slate-600">{b.total}</p>
        </div>

        <div className="mt-5">
          <button className="grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-slate-400/70 bg-white/20 shadow-md">
            <span className="text-2xl text-slate-900">+</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
