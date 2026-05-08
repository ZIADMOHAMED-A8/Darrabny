"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  BarChart3,
  Building2,
  Users,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";

const iconMap = {
  dashboard: House,
  report: BarChart3,
  partners: Building2,
  students: Users,
  settings: SettingsIcon,
};

export default function Sidebar({
  sectionTitle,
  sectionSubtitle,
  menuItems,
  logoutLabel,
}) {
  const pathname = usePathname();

  return (
    <aside className="relative flex w-[250px] shrink-0 flex-col justify-between border-r border-slate-200 bg-white">
      <div>
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-[22px] font-extrabold leading-none text-[#0c365f]">COMPANY ADMIN</p>
          <p className="mt-3 border-b border-slate-900/20 pb-3 text-[22px] font-extrabold leading-none text-[#0c365f]">
            {sectionTitle}
          </p>
          {sectionSubtitle ? (
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              {sectionSubtitle}
            </p>
          ) : null}
        </div>

        <nav className="space-y-1 px-2 py-5">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon] || SettingsIcon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#e9eef9] text-[#0f172a]"
                    : "text-slate-700 hover:bg-slate-100",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-6 pb-6">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-[#0d6db6] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0b5f9f]"
        >
          <LogOut className="h-3.5 w-3.5" />
          {logoutLabel}
        </button>
      </div>
    </aside>
  );
}
