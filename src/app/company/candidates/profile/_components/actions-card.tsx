"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { candidateProfileDummy } from "../_data/candidate-profile.dummy";

export default function ActionsCard() {
  // Actions card (static)

  const a = candidateProfileDummy.actions;

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] shadow-md">
      <CardContent className="p-6">
        <p className="text-sm font-semibold text-slate-900">{a.title}</p>

        <div className="mt-5 space-y-4">
          <Button className="w-full rounded-xl bg-[#0A79C9] hover:bg-[#0868AE]">
            {a.primary}
          </Button>

          <Button
            variant="secondary"
            className="w-full rounded-xl bg-[#D7E4FF] text-[#0A79C9] hover:bg-[#CFE0FF] border border-[#0A79C9]/60"
          >
            {a.secondary}
          </Button>

          <Button
            variant="secondary"
            className="w-full rounded-xl bg-[#D7E4FF] text-slate-800 hover:bg-[#CFE0FF] border border-slate-900/40"
          >
            {a.danger}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
