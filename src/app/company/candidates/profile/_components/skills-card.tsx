// app/company/candidates/profile/_components/skills-card.tsx
import { Card, CardContent } from "@/components/ui/card";
import { candidateProfileDummy } from "../_data/candidate-profile.dummy";

export default function SkillsCard() {
  const skills = candidateProfileDummy.candidate.skills;

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] shadow-md">
      <CardContent className="p-6">
        <p className="text-xs font-bold tracking-wide text-slate-900">SKILLS</p>

        <div className="mt-4 flex flex-wrap gap-3">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-xl bg-[#D7E4FF] px-4 py-2 text-sm text-[#155DFC] shadow-sm border border-black/10"
            >
              {s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
