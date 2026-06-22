"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, Menu, PanelLeft, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UseGetProfilePicture from "../company/hooks/useGetProfilePicture";
import UseGetCollegeProfilePicture from "../university/hooks/useGetProfilePicture";
import UseGetUserProfilePicture from "../student/hooks/useGetUserProfilePic";
import { User } from 'lucide-react';
type TopbarLink = {
  href: string;
  label: string;
};

const studentSidebarPaths = new Set([
  "/student/dashboard",
  "/student/applications",
  "/student/settings",
  "/student/Inprogressinternships",
]);

function getTopbarConfig(role?: string): {
  homeHref: string;
  links: TopbarLink[];
  profileHref: string;
} {
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
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const role = (session?.user as { role?: string } | undefined)?.role;


  const companyProfile = UseGetProfilePicture(role === 'company');
  const collegeProfile = UseGetCollegeProfilePicture(role === 'college');
  const userProfile = UseGetUserProfilePicture(role === 'user');


  const profileData =
    role === "company"
      ? companyProfile.data
      : role === "college"
        ? collegeProfile.data
        : role === 'user'
          ? userProfile.data
          : null;
  console.log(profileData, "user profile data")
  const isLoading =
    role === "company"
      ? companyProfile.isLoading
      : role === "college"
        ? collegeProfile.isLoading
        : role === 'user'
          ? userProfile.isLoading
          : null;

  const logo = role === "user" ? profileData?.data?.profilePic : role === 'company' ? profileData?.data?.logo : null;

  const { homeHref, links, profileHref } = getTopbarConfig(role);
  const sidebarEvent =
    role === "user" && studentSidebarPaths.has(pathname)
      ? "student-sidebar:open"
      : role === "company" &&
        ["/company/profile", "/company/settings", "/company/verification"].some(
          (path) => pathname === path || pathname.startsWith(`${path}/`),
        )
        ? "company-sidebar:open"
        : role === "college" &&
          (pathname === "/university/profile" ||
            pathname.startsWith("/university/profile/"))
          ? "university-sidebar:open"
          : null;



  return (
    <header className="sticky top-0 z-50 border-b border-[#0b1f33]/10 bg-white/85 backdrop-blur">
      <div className="px-4 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left */}
          <Link href={homeHref} className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--ds-primary)] text-white">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <span className="hidden text-2xl font-bold tracking-tight text-[var(--ds-primary)] sm:inline">
              Darrabny
            </span>
          </Link>

          {/* Center */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            {isLoading ? (
              <>
                <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
              </>
            ) : (
              links.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" &&
                    pathname.startsWith(`${link.href}/`));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 transition-colors ${active
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
              })
            )}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {sidebarEvent && (
              <button
                type="button"
                aria-label="Open account sidebar"
                onClick={() => window.dispatchEvent(new Event(sidebarEvent))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0b1f33]/15 bg-white text-[#0b1f33]/70 shadow-sm hover:bg-[#0b1f33]/5 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
              </button>
            )}

            {links.length > 0 && (
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="student-topbar-mobile-menu"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0b1f33]/15 bg-white text-[#0b1f33]/70 shadow-sm hover:bg-[#0b1f33]/5 md:hidden"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            )}

            <Link href={profileHref}>
              {isLoading ? (
                <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
              ) : logo ? (
                <img
                  src={logo}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover border border-[#0b1f33]/10"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0b1f33]/10 bg-slate-100">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
              )}
            </Link>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="student-topbar-mobile-menu"
            aria-label="Mobile navigation"
            className="space-y-1 border-t border-[#0b1f33]/10 py-3 md:hidden"
          >
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${active
                    ? "bg-[var(--ds-soft)] text-[var(--ds-primary)]"
                    : "text-[#0b1f33]/70 hover:bg-[#0b1f33]/5 hover:text-[#0b1f33]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
