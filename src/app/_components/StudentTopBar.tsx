"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";
import { useSession } from "next-auth/react";

const openSidebar = () => {
  window.dispatchEvent(new Event("student-sidebar:open"));
};

type TopbarLink = {
  href: string;
  label: string;
};

function getTopbarConfig(role?: string) {
  switch (role) {
    case "company":
      return {
        homeHref: "/company/dashboard",
        links: [
          { href: "/company/dashboard", label: "Dashboard" },
          { href: "/company/internships", label: "Internships" },
          { href: "/company/partners", label: "Partners" },
        ],
        profileHref: "/company/profile",
      };

    case "college":
      return {
        homeHref: "/university/dashboard",
        links: [
          { href: "/university/dashboard", label: "Dashboard" },
          { href: "/university/internships", label: "Internships" },
          { href: "/university/settings", label: "Settings" },
        ],
        profileHref: "/university/profile",
      };

    case "user":
      return {
        homeHref: "/student/dashboard",
        links: [
          { href: "/", label: "Home" },
          { href: "/student/internships", label: "Internships" },
          { href: "/student/companies", label: "Companies" },
        ],
        profileHref: "/student/dashboard",
      };

    default:
      return {
        homeHref: "/",
        links: [],
        profileHref: "/",
      };
  }
}

export default function StudentTopBar() {
  const pathname = usePathname();
  const { data } = useSession();

  const role = (data?.user as { role?: string } | undefined)?.role;

  const { homeHref, links, profileHref } = getTopbarConfig(role);

  return (
    <header className="sticky top-0 z-50 border-b border-[#0b1f33]/10 bg-white/85 backdrop-blur">
      <div className="px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left */}
          <Link href={homeHref} className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--ds-primary)] text-white">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <span className="text-2xl font-bold tracking-tight text-[var(--ds-primary)]">
              Darrabny
            </span>
          </Link>

          {/* Center */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" &&
                  pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 transition-colors ${
                    active
                      ? "text-[var(--ds-primary)]"
                      : "text-[#0b1f33]/70 hover:text-[#0b1f33]"
                  }`}
                >
                  {link.label}

                  {active && (
                    <span className="absolute inset-x-0 -bottom-[2px] mx-auto h-[2px] w-full rounded-full bg-[var(--ds-primary)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={openSidebar}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0b1f33]/15 bg-white text-[#0b1f33]/70 shadow-sm hover:bg-[#0b1f33]/5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 7h8M8 12h8M8 17h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <Link href={profileHref}>
              <div className="h-10 w-10 rounded-full border border-[#0b1f33]/10 bg-[linear-gradient(145deg,#f6c8a2,#9b6d4a)] shadow-sm" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}