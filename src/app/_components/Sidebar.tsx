"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Briefcase,
  FileText,
  User,
  Settings
} from "lucide-react";
import useGetUser from "../(student)/hooks/useGetLoginUser";
const menu = [
  { label: "Dashboard", href: "/dashboard" ,icon:Home},
  { label: "Internships", href: "/Inprogressinternships", icon: Briefcase },
  { label: "Applications", href: "/applications",icon:FileText },
  { label: "Resume", href: "/resume",icon:User },
  { label: "Settings", href: "/settings",icon:Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: userData, isLoading, error: userError } = useGetUser();
  if(isLoading){
    return <p>loading...</p>
  }
  else{

  return (
    <aside className="w-64 z-10 min-h-screen bg-white  flex flex-col justify-between px-4 py-6">
      {/* User */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-gray-300" />
          <div>
            <p className="font-medium">{userData.fullName}</p>
            <p className="text-xs text-gray-300">Student</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menu.map((Item) => {
            const Icon=Item.icon
            const active = pathname.startsWith(Item.href);
            return (
              <Link
              key={Item.href}
              href={Item.href}
              className={`flex items-center gap-3  px-4 py-3 rounded-xl transition
                ${
                  active
                    ? "bg-sky-100"
                    : "hover:bg-white/10"
                }
              `}
            >
              <Icon></Icon>

              <span>{Item.label}</span>
            </Link>
              

              
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button className=" w-32 px-4 py-2 text-white rounded-l bg-blue-600 hover:bg-blue-500 transition">
         Logout
      </button>
    </aside>
  );
}
}
