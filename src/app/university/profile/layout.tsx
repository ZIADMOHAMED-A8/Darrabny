"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
export default function Layout({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => setMobileOpen(false), [pathname]);

    useEffect(() => {
        const handleOpen = () => setMobileOpen(true);
        window.addEventListener("university-sidebar:open", handleOpen);
        return () => window.removeEventListener("university-sidebar:open", handleOpen);
    }, []);

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
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close university sidebar overlay"
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-[55] bg-black/40 md:hidden"
                />
            )}
            
            {/* Fixed Sidebar */}
            <aside className={`fixed left-0 top-0 z-[60] flex h-screen w-[280px] flex-col border-r border-gray-200 bg-white shadow-xl transition-transform duration-200 md:top-16 md:z-40 md:h-[calc(100vh-64px)] md:w-[220px] md:translate-x-0 md:shadow-none ${
                mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}>

                <div className="flex justify-end border-b border-gray-200 p-3 md:hidden">
                    <button
                        type="button"
                        aria-label="Close university sidebar"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

  

                {/* Menu */}
                <div className="flex-1 overflow-y-auto py-4">

                    {sidebarItems.map(
                        ({ label, icon, navigateTo }) => {
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
            <main className="min-h-screen md:ml-[220px] md:h-screen md:overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
