"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, MessageSquare } from "lucide-react";

const NAV = [
  { href: "/company/dashboard", label: "Dashboard" },
  { href: "/company/internships", label: "Internships" },
  { href: "/company/profile", label: "Profile" },
];

export default function CompanyNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="relative mx-auto flex h-14 items-center px-6">
        {/* Left: brand */}
        <div className="flex items-center gap-3">
          {/* Brand icon */}
          <div className="h-8 w-8 rounded bg-[#2196F3] flex items-center justify-center">
            <BriefcaseBusiness className="h-5 w-5 text-white" />
          </div>

          {/* Brand name */}
          <span className="text-lg font-bold text-[#2196F3]">Darrabny</span>
        </div>

        {/* Center: tabs */}
        <nav className="absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-8 text-sm font-medium">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "text-[#2196F3] border-b-2 border-[#2196F3] pb-0.5"
                      : "text-gray-500 hover:text-gray-800"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right: actions */}
        <div className="ml-auto flex items-center gap-3">
          <button
            aria-label="Messages"
            className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            <MessageSquare className="h-5 w-5" />
          </button>

          <div className="h-7 w-px bg-slate-200" />

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800 leading-tight">Alex Rivera</p>
              <p className="text-xs text-gray-400">Chief Editor</p>
            </div>
            <div className="h-9 w-9 overflow-hidden rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-400 text-sm font-bold">AR</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}