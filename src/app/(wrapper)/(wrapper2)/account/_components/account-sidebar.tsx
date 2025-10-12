// app/account/_components/account-inner-sidebar.tsx
"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { LogOut, Lock, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AccountInnerSidebar() {
  const pathname = usePathname();
  const search = useSearchParams();
  const router = useRouter();
  const tab = (search.get("tab") as "profile" | "password") ?? "profile";

  const goTab = (t: "profile" | "password") => {
    const params = new URLSearchParams(search);
    params.set("tab", t);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const Item = ({
    active,
    icon: Icon,
    label,
    onClick,
  }: {
    active?: boolean;
    icon: any;
    label: string;
    onClick?: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition border",
        active
          ? "bg-white text-blue-700 border-blue-200 shadow-sm"
          : "bg-transparent text-gray-700 border-transparent hover:bg-white hover:text-gray-900",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <Icon className={active ? "h-4 w-4 text-blue-600" : "h-4 w-4 text-gray-500"} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <aside className=" bg-white  flex flex-col min-h-screen">
      <div className="p-4 ">
        <div className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Account
        </div>

        <div className="space-y-2">
          <Item
            active={tab === "profile"}
            icon={UserRound}
            label="Profile"
            onClick={() => goTab("profile")}
          />
          <Item
            active={tab === "password"}
            icon={Lock}
            label="Change Password"
            onClick={() => goTab("password")}
          />
        </div>
      </div>

      {/* Logout pinned bottom */}
      <div className="mt-auto flex items-end flex-1 p-4">
      <Button
  onClick={() => {
    signOut({ callbackUrl: "/" });
  }}
  className="bg-red-50 w-full rounded-none text-red-800 flex justify-start gap-2 hover:bg-red-800 hover:text-white"

>
  <LogOut className="!w-6 !h-6 " />
  <span className="font-normal text-base">Logout</span>
</Button>


      </div>
    </aside>
  );
}
