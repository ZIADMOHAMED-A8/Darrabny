"use client";

import { useMemo } from "react";
import Sidebar from "./_components/Sidebar";
import CompanySettingsForm from "./_components/CompanySettingsForm";
import { useGetCompanySettings } from "./hooks/use-get-company-settings";

const sidebarItems = [
  { label: "Monitoring Report", href: "/company/report", icon: "report" },
  {
    label: "Company Partners",
    href: "/company/university-collaboration",
    icon: "partners",
  },
  { label: "Student Directory", href: "/company/candidates", icon: "students" },
  { label: "Settings", href: "/company/settings", icon: "settings" },
];

export default function CompanySettingsPage() {
  const { data, isLoading, isError, error } = useGetCompanySettings();
  const settings = data?.data || data;

  const formDefaultValues = useMemo(
    () => ({
      companyName:
        settings?.companyName || settings?.name || settings?.fullName || "",
      email: settings?.email || settings?.companyEmail || "",
      phone: settings?.companyPhone || settings?.phone || "",
      address: settings?.address || "",
      notifications: {
        email: Boolean(
          settings?.notifications?.email ||
          settings?.notificationSettings?.email,
        ),
        push: Boolean(
          settings?.notifications?.push || settings?.notificationSettings?.push,
        ),
        sms: Boolean(
          settings?.notifications?.sms || settings?.notificationSettings?.sms,
        ),
      },
    }),
    [
      settings?.companyName,
      settings?.name,
      settings?.fullName,
      settings?.email,
      settings?.companyEmail,
      settings?.companyPhone,
      settings?.phone,
      settings?.address,
      settings?.notifications?.email,
      settings?.notifications?.push,
      settings?.notifications?.sms,
      settings?.notificationSettings?.email,
      settings?.notificationSettings?.push,
      settings?.notificationSettings?.sms,
    ],
  );

  return (
    <main className="min-h-screen bg-[#e8edf8]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <Sidebar
          sectionTitle="SUPERVISORY PORTAL"
          menuItems={sidebarItems}
          logoutLabel="Logout"
        />

        <div className="relative flex-1 overflow-hidden px-6 py-7 md:px-8">
          <div className="pointer-events-none absolute right-0 top-0 h-[280px] w-[420px] bg-[radial-gradient(circle_at_top_right,rgba(116,150,214,0.25),transparent_65%)]" />

          <div className="relative max-w-[980px]">
            <h2 className="text-[34px] font-extrabold text-[#0f1b33]">
              Settings
            </h2>

            {isLoading ? (
              <div className="mt-5 rounded-2xl border border-[#d8dfec] bg-white px-5 py-4">
                <div className="animate-pulse space-y-4">
                  <div className="h-7 w-52 rounded bg-slate-200" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="h-12 rounded bg-slate-200" />
                    <div className="h-12 rounded bg-slate-200" />
                    <div className="h-12 rounded bg-slate-200" />
                    <div className="h-12 rounded bg-slate-200" />
                  </div>
                </div>
              </div>
            ) : null}

            {isError ? (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {String(error?.message || "Failed to load settings")}
              </div>
            ) : null}

            {isLoading && !settings ? (
              <div className="mt-5 rounded-2xl border border-[#d8dfec] bg-white px-5 py-4">
                <div className="animate-pulse space-y-4">
                  <div className="h-7 w-52 rounded bg-slate-200" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="h-12 rounded bg-slate-200" />
                    <div className="h-12 rounded bg-slate-200" />
                    <div className="h-12 rounded bg-slate-200" />
                    <div className="h-12 rounded bg-slate-200" />
                  </div>
                </div>
              </div>
            ) : null}

            {settings ? (
              <CompanySettingsForm defaultValues={formDefaultValues} />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
