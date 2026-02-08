// app/company/candidates/profile/_components/status-timeline.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { candidateProfileDummy } from "../_data/candidate-profile.dummy";

export default function StatusTimeline() {
  const steps = candidateProfileDummy.applicationStatus.steps;

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-semibold text-slate-900">
            Application Status
          </p>

          <Badge className="rounded-full bg-slate-700/30 text-slate-900 border border-black/10 px-3 py-1">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-900" />
            {candidateProfileDummy.applicationStatus.label}
          </Badge>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-slate-400/60" />
            <div className="absolute left-0 top-5 h-1 w-[55%] rounded-full bg-[#155DFC]" />

            <div className="relative grid grid-cols-5 items-start gap-2">
              {steps.map((s, idx) => {
                const isDone = !!s.done;
                const isActive = "active" in s && !!s.active;

                return (
                  <div key={s.title} className="flex flex-col items-center">
                    <div
                      className={[
                        "grid h-10 w-10 place-items-center rounded-full shadow-md",
                        isDone
                          ? "bg-[#155DFC] text-white"
                          : "bg-[#CFE0FF] text-slate-900",
                        isActive ? "ring-4 ring-[#155DFC]/30" : "",
                      ].join(" ")}
                    >
                      {isDone ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">{idx + 1}</span>
                      )}
                    </div>

                    <p className="mt-2 text-xs font-semibold text-slate-900">
                      {s.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
