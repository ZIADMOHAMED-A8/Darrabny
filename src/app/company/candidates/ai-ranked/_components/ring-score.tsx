"use client";

export default function RingScore({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div
      className="relative grid h-12 w-12 place-items-center rounded-full"
      style={{
        background: `conic-gradient(#2EA1FF 0deg ${pct * 3.6}deg, rgba(46,161,255,0.15) ${pct * 3.6}deg 360deg)`,
      }}
    >
      <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ic-surface)] shadow-sm">
        <span className="text-xs font-semibold text-[#2EA1FF]">{pct}%</span>
      </div>
    </div>
  );
}
