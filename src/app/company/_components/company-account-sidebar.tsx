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
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const handleOpen = () => setMobileOpen(true);
    window.addEventListener("company-sidebar:open", handleOpen);
    return () => window.removeEventListener("company-sidebar:open", handleOpen);
  }, []);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close company sidebar overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[55] bg-black/40 md:hidden"
        />
      )}

      <aside className={`fixed left-0 top-0 z-[60] flex h-screen w-[280px] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 md:top-[72px] md:z-40 md:h-[calc(100vh-4.5rem)] md:w-[220px] md:translate-x-0 md:shadow-none ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
  

      <nav className="block flex-1 overflow-y-auto py-4">
        {navItems.map(({ label, href, icon: Icon, isActive }) => {
          const active = isActive(pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`flex w-full items-center gap-3 px-5 py-3 text-left text-[13px] transition-all duration-200 ${
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
    </>
  );
}
