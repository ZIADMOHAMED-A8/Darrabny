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
    <section className="mx-auto pb-14">
      <h2 className="text-center text-3xl font-semibold">How It Works</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {howItWorks.map((s) => {
          const Icon = ICONS[s.icon];

          return (
            <Card
              key={s.id}
              className="border-0 bg-[var(--ic-surface)] text-[var(--ic-ink)] rounded-2xl shadow-md"
            >
              <CardContent className="px-8 py-16 text-center">
                {/* Step icon */}
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/35">
                  <Icon className="h-7 w-7 text-[#155DFC]" />
                </div>

                {/* Step title */}
                <h3 className="text-xl font-semibold">{s.title}</h3>

                {/* Step description */}
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {s.desc}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
