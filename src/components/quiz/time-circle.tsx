"use client";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React from "react";

const TIMER_SIZE = 42;
const TIMER_STROKE = 4;

type TimerCircleProps = {
  deadline: number | null;
  durationSeconds: number;
  onComplete: () => void;
};

export default function TimerCircle({
  deadline,
  durationSeconds,
  onComplete,
}: TimerCircleProps) {
  if (!deadline) return null;

  const initialRemainingTime = Math.max(
    0,
    Math.floor((deadline - Date.now()) / 1000)
  );

  return (
    <div className="relative w-[42px] h-[42px]">
      <CountdownCircleTimer
        key={deadline}
        isPlaying={initialRemainingTime > 0}
        duration={durationSeconds}
        initialRemainingTime={initialRemainingTime}
        size={TIMER_SIZE}
        strokeWidth={TIMER_STROKE}
        trailColor="#e5e7eb"
        colors={["#2563eb", "#ef4444"]}
        colorsTime={[durationSeconds, 0]}
        onComplete={() => {
          onComplete?.();
          return { shouldRepeat: false };
        }}
      >
        {({ remainingTime, color }) => {
          const mm = String(Math.floor(remainingTime / 60));
          const ss = String(remainingTime % 60).padStart(2, "0");
          return (
            <span
              style={{ color }}
              className="absolute inset-0 text-[10px] font-semibold flex items-center justify-center"
            >
              {mm}:{ss}
            </span>
          );
        }}
      </CountdownCircleTimer>
    </div>
  );
}
