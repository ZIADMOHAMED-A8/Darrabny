"use client";
import { PropsWithChildren } from "react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
export default function Layout({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const router = useRouter();

    const sidebarItems = [
        {
            label: "Monitoring Report",
            path: "/profile",
            navigateTo: "/university/profile",
            icon: (
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
            ),
        },
        {
            label: "Company Partners",
            path: "/partners",
            navigateTo: "/university/profile/partners",
            icon: (
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            ),
        },
    ];

    return (
        <div className="bg-[#F5F7FB] font-sans text-sm">
            
            {/* Fixed Sidebar */}
            <aside className="fixed left-0 top-16 flex h-[calc(100vh-64px)] w-[220px] pt-0 flex-col border-r border-gray-200 bg-white">

  

                {/* Menu */}
                <div className="flex-1 overflow-y-auto py-4">

                    {sidebarItems.map(
                        ({ label, icon, path, navigateTo }) => {
                            const active =
                            label === "Company Partners"
                              ? pathname.includes("/partners") ||
                                pathname.includes("/company_profile")
                              : pathname.includes("/profile") &&
                                !pathname.includes("/partners") &&
                                !pathname.includes("/company_profile");

                            return (
                                <button
                                    key={label}
                                    onClick={() => router.push(navigateTo)}
                                    className={`flex w-full items-center gap-3 px-5 py-3 text-left text-[13px] transition-all duration-200
                                    ${
                                        active
                                            ? "border-r-2 border-[#1565C0] bg-[#EEF3FF] font-medium text-[#1565C0]"
                                            : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        width={16}
                                        height={16}
                                    >
                                        {icon}
                                    </svg>

                                    {label}
                                </button>
                            );
                        }
                    )}
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 p-3">
                    <button
                        onClick={() => {
                            signOut({ callbackUrl: "/login" });
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1565C0] px-4 py-2.5 text-[13px] font-medium text-white transition hover:opacity-90"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="white"
                            width={14}
                            height={14}
                        >
                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>

                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-[220px] h-screen overflow-y-auto">
                {children}
            </main>
        </div>
    );
}