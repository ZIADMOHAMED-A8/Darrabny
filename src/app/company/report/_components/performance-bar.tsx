"use client";

type PerformanceBarProps = {
  value: number;
};

export default function PerformanceBar({ value }: PerformanceBarProps) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#0f3a5c] to-[#1f84cc]"
          style={{ width: `${safeValue}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-700">{safeValue}%</span>
    </div>
  );
}
