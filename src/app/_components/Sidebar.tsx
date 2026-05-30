"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getu } from "./getloginstudent";
import {
  Home,
  Briefcase,
  FileText,
  User,
  Settings,
  X,
} from "lucide-react";
import useGetUser from "../student/hooks/useGetLoginUser";
import { headers } from "next/headers";
import { getToken } from "@/lib/utils/get-token.util";
import { signOut } from "next-auth/react"
const menu = [
  { label: "Dashboard", href: "/student/dashboard", icon: Home },
  { label: "Internships", href: "/student/Inprogressinternships", icon: Briefcase },
  { label: "Applications", href: "/student/applications", icon: FileText },
  { label: "Resume", href: "/profile", icon: User },

  { label: "Settings", href: "/student/settings", icon: Settings },

];

export default function Sidebar() {
  const pathname = usePathname();
  const {
    data: userData,
    isLoading,
    error: userError,
    isError,
    refetch,
  } = useGetUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOpen = () => setMobileOpen(true);
    window.addEventListener("student-sidebar:open", handleOpen);

    return () => {
      window.removeEventListener("student-sidebar:open", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const user = userData?.data ?? userData?.user ?? userData;
  const fullNameFromParts = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const displayName =
    isLoading ? "Loading..." : user?.fullName || fullNameFromParts || "Student";

  const sidebarContent = (
    <>
      <div>
        {isError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <p className="mb-2">
              {userError instanceof Error
                ? userError.message
                : "Failed to load profile data."}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        )}

        <div className="mb-8 flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-gray-300" />
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-400">Student</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3  px-4 py-3 rounded-xl transition
                ${
                  active
                    ? "bg-sky-100 text-sky-900"
                    : "text-gray-700 hover:bg-sky-50"
                }
              `}
              >
                <Icon className="h-4 w-4 shrink-0" />

                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button onClick={()=>{
        signOut({ callbackUrl: '/login' })
      }} className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
        Logout
      </button>
    </>
  );

  return (
    <>
      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close sidebar overlay"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />
          <aside className="fixed left-0 top-0 z-50 duration-300 flex h-screen w-[82%] max-w-[300px] flex-col justify-between bg-white px-4 py-6 shadow-xl md:hidden">
            <div className="mb-2 flex items-center justify-end">
              <button
                type="button"
                aria-label="Close sidebar"
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {sidebarContent}
          </aside>
        </>
      )}

      <aside className="max-h-[calc(100vh-64px)]  overflow-y-hidden sticky top-0 z-10 hidden min-h-[calc(100vh-16px)]w-64 flex-col justify-between bg-white px-4 py-6 md:flex lg:w-72">
        {sidebarContent}
      </aside>
    </>
  );
}