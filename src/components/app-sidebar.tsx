"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  FolderCode,
  GraduationCap,
  UserRound,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const items = [
  { title: "Diplomas", href: "/", icon: GraduationCap },
  { title: "Account Settings", href: "/account", icon: UserRound },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { open, toggleSidebar } = useSidebar(); 

  return (
    <Sidebar collapsible="icon" className="h-vh">
      <SidebarContent className="flex h-full flex-col bg-blue-50">
        {/* Header: اللوجو + زرار التوجّل */}
        <div className={`flex items-center justify-between ${open ? "p-5" : "p-4"}`}>
          <div className="flex items-center gap-2">
            <Image
              src="/Final-Logo-1.svg"
              alt="Elevate"
              width={open ? 120 : 36}
              height={36}
              className={open ? "h-auto w-[120px]" : "h-9 w-9 rounded"}
              priority
            />
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-blue-700 shadow hover:bg-blue-200"
          >
            {open ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* عنوان التطبيق */}
        <div className={`${open ? "px-5 pb-4" : "px-4 pb-3"}`}>
          <div className="flex items-center gap-2" title="Exam App">
            <FolderCode className="h-7 w-7 text-blue-700" />
            {open && (
              <span className="text-sm font-semibold text-blue-700/80 truncate">
                Exam App
              </span>
            )}
          </div>
        </div>

        {/* القائمة */}
        <SidebarGroupContent className="px-2">
          <SidebarMenu className="space-y-2">
            {items.map(({ title, href, icon: Icon }) => {
              const active =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));

              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={active}>
                    <Link
                      href={href}
                      className={[
                        "flex items-center rounded-none transition text-sm border",
                        open
                          ? "gap-3 px-3 py-6" 
                          : "gap-0 px-3 py-6 justify-center",
                        active
                          ? "!bg-blue-100 !text-blue-600 border border-[#2B7FFF]"
                          : "bg-transparent text-gray-700 border-transparent hover:bg-white hover:text-gray-900",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                      title={title}
                    >
                      <Icon
                        className={
                          active
                            ? "h-6 w-6 text-blue-600"
                            : "h-6 w-6 text-gray-500"
                        }
                      />
                      {open && <span className="font-medium truncate">{title}</span>}
                    </Link>

                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>

        {/* معلومات المستخدم */}
        <div className="mt-auto px-3 pb-4">
          <div className="flex items-center gap-3 rounded-md p-2">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-[#031b4e]">
                {session?.user?.name ?? "Guest"}
              </div>
              {open && (
                <div className="truncate text-xs text-gray-500">
                  {session?.user?.email ?? ""}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
