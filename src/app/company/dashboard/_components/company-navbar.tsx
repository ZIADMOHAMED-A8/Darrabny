"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, BriefcaseBusiness } from "lucide-react";

const NAV = [
  { href: "/company/dashboard", label: "Dashboard" },
  { href: "/company/internships", label: "Internships" },
  { href: "/company/admins", label: "Admins" },
];

export default function CompanyNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 bg-[var(--ic-header)]/95 backdrop-blur">
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
          <div className="flex items-center gap-8 rounded-2xl border border-white/10 bg-[#013056]/35 px-6 py-2 text-sm font-semibold text-white shadow-sm">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "text-[#2196F3]" : "text-white/90 hover:text-white"}
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
            aria-label="Notifications"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Bell className="h-5 w-5" />
          </button>

          <button
            aria-label="Profile"
            className="h-9 w-9 overflow-hidden rounded-full bg-white/10"
          >
            {/* Placeholder avatar */}
            <span className="block h-full w-full bg-white/10" />
          </button>
        </div>
      </div>
    </header>
  );
}
