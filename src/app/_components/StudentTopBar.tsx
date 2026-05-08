"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, BriefcaseBusiness, MessageSquare, Search } from "lucide-react";

const openSidebar = () => {
  window.dispatchEvent(new Event("student-sidebar:open"));
};

export default function StudentTopBar() {
  const pathname = usePathname();

  const links = [
    { href: "/student/dashboard", label: "Dashboard" },
    { href: "/student/internships", label: "Internships" },
    { href: "/student/companies", label: "Companies" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#0b1f33]/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex min-h-[64px] max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:min-h-[72px] md:px-8">
        {/* Left */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--ds-primary)] text-white">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
          <p className="text-xl font-bold tracking-tight text-[var(--ds-primary)] sm:text-2xl">
            Darrabny
          </p>
        </Link>

        {/* Center */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#0b1f33]/70 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);

            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "relative py-2 transition-colors",
                  active ? "text-[var(--ds-primary)]" : "hover:text-[#0b1f33]",
                ].join(" ")}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-[2px] mx-auto h-[2px] w-10 rounded-full bg-[var(--ds-primary)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">


          <button
            type="button"
            aria-label="Open sidebar"
            onClick={openSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0b1f33]/15 bg-white text-[#0b1f33]/70 shadow-sm hover:bg-[#0b1f33]/5 md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M8 7h8M8 12h8M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            href="/notifications"
            aria-label="Notifications"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0b1f33]/15 bg-white text-[#0b1f33]/70 shadow-sm hover:bg-[#0b1f33]/5"
          >
            <Bell className="h-5 w-5" />
          </Link>


          <div className="h-10 w-10 rounded-full border border-[#0b1f33]/10 bg-[linear-gradient(145deg,#f6c8a2,#9b6d4a)] shadow-sm" />
        </div>
      </div>
    </header>
  );
}
