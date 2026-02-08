"use client";

export default function CompanyInternshipsPagination() {
  return (
    <div className="mt-12 flex items-center justify-center gap-2 text-sm text-white/80">
      <button className="px-3 py-2 rounded-md hover:bg-white/10">‹ Previous</button>

      <div className="flex items-center gap-1">
        <button className="h-9 w-9 rounded-md bg-black/40 text-white">1</button>
        <button className="h-9 w-9 rounded-md hover:bg-white/10">2</button>
        <button className="h-9 w-9 rounded-md hover:bg-white/10">3</button>
        <span className="px-2">…</span>
        <button className="h-9 w-9 rounded-md hover:bg-white/10">10</button>
      </div>

      <button className="px-3 py-2 rounded-md hover:bg-white/10">Next ›</button>
    </div>
  );
}
