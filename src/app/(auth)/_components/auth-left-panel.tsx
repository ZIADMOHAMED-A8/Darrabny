import {
  BriefcaseBusiness,
  FlaskConical,
  Lightbulb,
  LineChart,
} from "lucide-react";

const FEATURES = [
  {
    icon: FlaskConical,
    title: "Tailored Training Tracks",
    desc: "Choose from specialized learning paths like Frontend, Backend, and Data Science.",
  },
  {
    icon: Lightbulb,
    title: "Hands-On interactive Trainings",
    desc: "Gain practical experience with real-world projects and guided exercises.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    desc: "Monitor your learning milestones and achievements easily.",
  },
];

export default function AuthLeftPanel() {
  return (
    <div className="relative h-full">
      {/* Brand row */}
      <div className="flex items-center gap-4">
        <div
          className="grid h-12 w-12 place-items-center rounded-2xl"
          style={{
            background: "rgba(10,121,201,.12)",
            color: "var(--ds-primary)",
            boxShadow: "var(--ds-soft-shadow)",
          }}
        >
          <BriefcaseBusiness className="h-6 w-6" />
        </div>

        <p
          className="text-[32px] font-semibold tracking-[-0.02em]"
          style={{ color: "var(--ds-primary)" }}
        >
          Darrabny
        </p>
      </div>

      {/* Hero */}
      <h1
        className="mt-12 max-w-[560px] text-4xl font-semibold leading-[1.08] tracking-[-0.03em]"
        style={{ color: "var(--ds-ink)" }}
      >
        Empower your
        <br />
        learning journey with
        <br />
        our smart training platform.
      </h1>

      {/* Features */}
      <div className="mt-12 space-y-10">
        {FEATURES.map((f) => {
          const Icon = f.icon;

          return (
            <div key={f.title} className="flex items-start gap-5">
              <div
                className="grid h-14 w-14 place-items-center rounded-full"
                style={{
                  background: "var(--ds-soft)",
                  color: "var(--ds-primary)",
                  boxShadow: "var(--ds-soft-shadow)",
                }}
              >
                <Icon className="h-7 w-7" />
              </div>

              <div className="pt-1">
                <p
                  className="text-[22px] font-semibold leading-[1.2]"
                  style={{ color: "var(--ds-ink)" }}
                >
                  {f.title}
                </p>

                <p
                  className="mt-2 max-w-[520px] text-[16px] leading-[1.7]"
                  style={{ color: "var(--ds-muted)" }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
