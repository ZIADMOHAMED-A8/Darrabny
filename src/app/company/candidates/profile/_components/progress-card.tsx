// app/company/candidates/profile/_components/progress-card.tsx
import { Card, CardContent } from "@/components/ui/card";
import { candidateProfileDummy } from "../_data/candidate-profile.dummy";
import StarsRow from "./stars-row";

export default function ProgressCard() {
  const p = candidateProfileDummy.progress;

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] shadow-md">
      <CardContent className="p-6">
        <p className="text-sm font-semibold text-slate-900">{p.title}</p>

        <div className="mt-6 flex items-center justify-between gap-6">
          <div
            className="relative grid h-24 w-24 place-items-center rounded-full"
            style={{ background: "conic-gradient(#2EA1FF 0deg 360deg, #BFD2FF 0deg)" }}
          >
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--ic-surface)]">
              <p className="text-center text-xs font-bold leading-4 text-slate-900 whitespace-pre-line">
                {p.donutLabel}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-end gap-4">
              <p className="text-4xl font-semibold text-slate-900">{p.rating.toFixed(1)}</p>
              <div className="pb-1">
                <StarsRow value={5} />
                <p className="mt-1 text-xs text-slate-700">{p.ratingLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
