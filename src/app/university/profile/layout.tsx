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
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#F5F7FB",
                fontFamily: "sans-serif",
                fontSize: 14,
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: 200,
                    background: "#fff",
                    borderRight: "0.5px solid #e5e7eb",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px 0",
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "0 20px 20px",
                        borderBottom: "0.5px solid #e5e7eb",
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            background: "#1565C0",
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="white" width={18} height={18}>
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: 15,
                                fontWeight: 700,
                                color: "#1565C0",
                            }}
                        >
                            Darrabny
                        </div>

                        <div
                            style={{
                                fontSize: 9,
                                color: "#aaa",
                                letterSpacing: "0.5px",
                                textTransform: "uppercase",
                            }}
                        >
                            Internship Hub
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 16 }}>
                    {sidebarItems.map(({ label, icon, path, navigateTo }) => {

                        const active =
                            path === "/profile"
                                ? pathname.includes("profile") &&
                                !pathname.includes("partners")
                                : pathname.includes(path);

                        return (
                            <div
                                key={label}
                                onClick={() => router.push(navigateTo)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "9px 20px",
                                    fontSize: 13,
                                    color: active ? "#1565C0" : "#555",
                                    cursor: "pointer",
                                    background: active ? "#EEF3FF" : "transparent",
                                    borderRight: active
                                        ? "2px solid #1565C0"
                                        : "none",
                                    fontWeight: active ? 500 : 400,
                                    transition: "0.2s",
                                }}
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
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: "auto", padding: "0 12px" }}>
                    <button
                        onClick={() => {
                            signOut({ callbackUrl: "/login" });
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: "#1565C0",
                            color: "white",
                            border: "none",
                            padding: "9px 16px",
                            borderRadius: 8,
                            fontSize: 13,
                            cursor: "pointer",
                            width: "100%",
                        }}
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

            {children}
        </div>
    );
}