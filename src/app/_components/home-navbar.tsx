"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";

export default function HomeNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 bg-[var(--ic-header)] backdrop-blur">
      <div className="mx-auto grid h-14 grid-cols-3 items-center px-4">
        {/* Left */}
        <div className="flex items-center gap-3 justify-self-start">
          {/* Brand icon */}
          <div className="h-8 w-8 rounded bg-[#2196F3] flex items-center justify-center">
            <BriefcaseBusiness className="h-5 w-5 text-white" />
          </div>

          {/* Brand name */}
          <span className="text-xl font-bold text-[#2196F3]">Darrabny</span>
        </div>

        {/* Center */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold bg-[#013056]/25 px-2.5 py-2.5 rounded-2xl justify-self-center">
          <Link
            href="/"
            className={pathname === "/" ? "text-[#2196F3]" : "text-white"}
          >
            Home
          </Link>

          <Link
            href="/internships"
            className={
              pathname === "/internships" ? "text-[#2196F3]" : "text-white"
            }
          >
            Internships
          </Link>

          <Link
            href="/companies"
            className={
              pathname === "/companies" ? "text-[#2196F3]" : "text-white"
            }
          >
            Companies
          </Link>

          <Link
            href="/career-consulting"
            className={
              pathname === "/career-consulting"
                ? "text-[#2196F3]"
                : "text-white"
            }
          >
            Career Counsueling
          </Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 justify-self-end">
          {/* Profile placeholder */}
          <div className="h-9 w-9 rounded-full bg-white/10" />
        </div>
      </div>
    </header>
  );
}
