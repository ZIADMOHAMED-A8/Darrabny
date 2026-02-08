// app/company/candidates/profile/_components/evaluator-feedback-card.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { candidateProfileDummy } from "../_data/candidate-profile.dummy";
import StarsRow from "./stars-row";

export default function EvaluatorFeedbackCard() {
  const e = candidateProfileDummy.evaluatorFeedback;

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-semibold text-slate-900">{e.title}</p>
          <p className="text-xs text-slate-600">{e.lastUpdated}</p>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-900">{e.noteTitle}</p>

          <div className="mt-3 rounded-2xl bg-white/40 p-5 text-sm text-slate-700 border border-black/10">
            {e.note}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-900">Overall Score:</p>
            <StarsRow value={e.overallScore} />
          </div>

          <Button className="rounded-xl bg-[#0A79C9] hover:bg-[#0868AE]">
            Save Evaluation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
