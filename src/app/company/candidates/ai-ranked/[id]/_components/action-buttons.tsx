"use client";

import { Button } from "@/components/ui/button";
import { Check, Send, X } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="mt-8 space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          className="h-12 rounded-xl bg-white text-red-600 hover:bg-white/95"
        >
          <X className="mr-2 h-5 w-5" />
          Reject
        </Button>

        <Button className="h-12 rounded-xl bg-[#0A79C9] hover:bg-[#0868AE]">
          <Check className="mr-2 h-5 w-5" />
          Accept
        </Button>
      </div>

    </div>
  );
}
