import { Card, CardContent } from "@/components/ui/card";
import { howItWorks } from "@/data/home.dummy";
import { User, Search, Rocket, Award } from "lucide-react";

const ICONS = {
  user: User,
  search: Search,
  rocket: Rocket,
  award: Award,
} as const;

export default function HowItWorks() {
  return (
    <section className="mx-auto pb-14 md:pb-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-[#063058] md:text-3xl">
          How It Works
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {howItWorks.map((s) => {
            const Icon = ICONS[s.icon];

            return (
              <Card
                key={s.id}
                className="rounded-2xl border border-white/60 bg-white/55 text-[var(--ds-ink)] shadow-[0_14px_34px_rgba(16,24,40,0.12)] backdrop-blur-sm"
              >
                <CardContent className="px-6 py-8 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ds-soft)] ring-1 ring-[var(--ds-border)]">
                    <Icon className="h-6 w-6 text-[var(--ds-primary)]" />
                  </div>

                  <h3 className="text-base font-semibold text-[#0b1f33] md:text-lg">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--ds-muted)]">
                    {s.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
