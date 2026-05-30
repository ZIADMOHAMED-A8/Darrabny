"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BriefcaseBusiness,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const navItems = [
  {
    label: "Profile",
    href: "/company/profile",
    icon: UserRound,
    isActive: (pathname: string) => pathname === "/company/profile",
  },
  {
    label: "Verification",
    href: "/company/verification",
    icon: ShieldCheck,
    isActive: (pathname: string) =>
      pathname === "/company/verification" ||
      pathname.startsWith("/company/verification/"),
  },
  {
    label: "Settings",
    href: "/company/settings",
    icon: Settings,
    isActive: (pathname: string) =>
      pathname === "/company/settings" ||
      pathname.startsWith("/company/settings/"),
  },
] as const;

export default function CompanyAccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="z-40 flex w-full flex-col border-b border-slate-200 bg-white md:fixed md:left-0 md:top-[72px] md:h-[calc(100vh-4.5rem)] md:w-[220px] md:border-b-0 md:border-r">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-4 md:px-5 md:py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A6FA8] text-white">
          <BriefcaseBusiness className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-[#1A6FA8]">Darrabny</h2>
          <p className="text-[9px] uppercase tracking-[0.5px] text-slate-400">
            Company Account
          </p>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-2 py-3 md:block md:flex-1 md:overflow-y-auto md:px-0 md:py-4">
        {navItems.map(({ label, href, icon: Icon, isActive }) => {
          const active = isActive(pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] transition-all duration-200 md:w-full md:gap-3 md:rounded-none md:px-5 md:py-3 ${
                active
                  ? "bg-[#EEF2FB] font-medium text-[#1A6FA8] md:border-r-2 md:border-[#1A6FA8]"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1A6FA8] px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#155E92]"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
