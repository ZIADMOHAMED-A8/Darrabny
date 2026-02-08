"use client";

export default function RecentExperience({
  items,
}: {
  items: { title: string; org: string; year: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-bold text-[#0B4A7A]">RECENT EXPERIENCE</p>

      <div className="mt-4 space-y-4">
        {items.map((x, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#0B4A7A]" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{x.title}</p>
              <p className="text-xs text-slate-700">
                {x.org} | {x.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
