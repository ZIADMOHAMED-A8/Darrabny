// app/company/report/_components/report-feedback.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { reportDummy } from "../_data/report.dummy";

function Bubble({
  side,
  initials,
  name,
  role,
  time,
  body,
}: {
  side: "left" | "right";
  initials: string;
  name: string;
  role: string;
  time: string;
  body: string;
}) {
  // Chat bubble (static)

  const isRight = side === "right";

  return (
    <div className={`flex gap-3 ${isRight ? "flex-row-reverse" : ""}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3A6AE] font-semibold text-white shadow">
        {initials}
      </div>

      <div className={`max-w-[720px] flex-1 ${isRight ? "text-right" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#001225]/70">
          <span className="font-semibold text-[#001225]">{name}</span>
          <span>{role}</span>
          <span className="ml-auto">{time}</span>
        </div>

        <div
          className={`mt-2 rounded-2xl border border-black/10 p-4 text-sm leading-6 ${
            isRight ? "bg-white" : "bg-white/70"
          }`}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

export default function ReportFeedback() {
  // Feedback section (static)

  const t = reportDummy.feedback.thread;

  return (
    <Card className="rounded-2xl border-0 bg-[#C1D2EE] text-[#001225] shadow-md">
      <div className="border-b border-black/15 px-6 py-4">
        <h3 className="text-lg font-semibold">Supervisor Feedback</h3>
      </div>

      <div className="space-y-6 px-6 py-5">
        {t.map((m) => (
          <Bubble
            key={m.id}
            side={m.side}
            initials={m.initials}
            name={m.name}
            role={m.role}
            time={m.time}
            body={m.body}
          />
        ))}

        {/* Input (UI only) */}
        <div className="rounded-2xl bg-white/60 p-4">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Add your feedback or request changes..."
              className="h-12 rounded-xl border-black/10 bg-white"
            />
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              <SendHorizontal className="h-5 w-5 text-[#001225]" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
