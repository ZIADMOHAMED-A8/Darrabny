// app/company/candidates/profile/_components/candidate-card.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Circle } from "lucide-react";
import { candidateProfileDummy } from "../_data/candidate-profile.dummy";

export default function CandidateCard() {
  const c = candidateProfileDummy.candidate;

  return (
    <Card className="  bg-[var(--ic-surface)] shadow-md">
      <CardContent className="p-0 overflow-hidden">
        <div className="relative h-32 bg-slate-900/80">
          <div className="absolute inset-0 opacity-30" />
          <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/80 bg-white/10">
            <Circle className="h-10 w-10 text-white/80" />
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-center text-3xl font-bold text-slate-900">{c.name}</h2>
          <p className="mt-2 text-center text-sm text-slate-700">{c.role}</p>

          <Separator className="my-5 bg-black/10" />

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs font-bold tracking-wide text-slate-900">UNIVERSITY</p>
              <p className="text-slate-800">{c.university}</p>
            </div>

            <div>
              <p className="text-xs font-bold tracking-wide text-slate-900">MAJOR</p>
              <p className="text-slate-800">{c.major}</p>
            </div>

            <div>
              <p className="text-xs font-bold tracking-wide text-slate-900">GPA</p>
              <p className="text-slate-800">{c.gpa}</p>
            </div>

            <div>
              <p className="text-xs font-bold tracking-wide text-slate-900">GRAD YEAR</p>
              <p className="text-slate-800">{c.gradYear}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
