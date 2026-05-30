"use client";

import { ChevronLeft, Router } from "lucide-react";
import { aiRankedDummy } from "../_data/ai-ranked.dummy";
import { useRouter } from "next/navigation";

export default function RankedHeader() {
  const router=useRouter()
  return (
    <div className="flex items-start gap-4">
      <button onClick={()=>{
        router.back()
      }} className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-black">
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div>
        <h1 className="text-3xl font-semibold text-black">{aiRankedDummy.title}</h1>
        <p className="mt-2 text-sm text-black">{aiRankedDummy.subtitle}</p>
      </div>
    </div>
  );
}
