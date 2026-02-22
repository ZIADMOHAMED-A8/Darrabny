"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Internships", href: "/Inprogressinternships" },
  { label: "Applications", href: "/applications" },
  { label: "Resume", href: "/resume" },
  { label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 z-10 min-h-screen bg-white  flex flex-col justify-between px-4 py-6">
      {/* User */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-gray-300" />
          <div>
            <p className="font-medium">Sophia Chen</p>
            <p className="text-xs text-gray-300">Student</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menu.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    active
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }
                `}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition">
        ⎋ Logout
      </button>
    </aside>
  );
}
