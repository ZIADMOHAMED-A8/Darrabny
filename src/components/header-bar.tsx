"use client";

import { usePathname } from "next/navigation";
// import ArrowBack from "@/components/arrow-back";
import { GraduationCap } from "lucide-react";
import ArrowBack from "./arrow-back";

export default function HeaderBar({
  title,
  icon,
}: {
 
  title?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const pathname = usePathname();
  const showBack = pathname !== "/";

  return (
    <div className="mx-auto w-full py-6">
      <div className="flex items-stretch gap-3">
        {showBack && <ArrowBack />}

        <div className="flex flex-1 items-center gap-3 bg-[#155DFC] px-4 py-4 text-white">
        <span className="h-12 w-12 flex items-center justify-center">
  {icon ?? <GraduationCap className="h-full w-full" />}
</span>

          <h1 className="text-3xl font-heading font-semibold leading-none">{title}</h1>
        </div>
      </div>
    </div>
  );
}
