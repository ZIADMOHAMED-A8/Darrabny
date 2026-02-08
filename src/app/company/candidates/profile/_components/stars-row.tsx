// app/company/candidates/profile/_components/stars-row.tsx
import { Star } from "lucide-react";

export default function StarsRow({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${filled ? "text-amber-400" : "text-slate-300"}`}
            fill={filled ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
}
