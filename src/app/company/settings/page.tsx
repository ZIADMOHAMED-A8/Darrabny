"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useUpdateCollegeNotifications } from "./hooks/use-update-college-notifications";
import CompanyAccountSidebar from "../_components/company-account-sidebar";
import { useGetCollegeSettings } from "./hooks/use-get-college-settings";
import { useUpdateCollegeSettings } from "./hooks/use-update-college-settings";
type SettingsForm = {
  companyName: string;
  email: string;
  companyPhone: string;
  address: string;
};

type NotificationState = {
  email: boolean;
  push: boolean;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asBoolean(
  value: unknown,
  fallback: boolean
) {
  return typeof value === "boolean"
    ? value
    : fallback;
}

function normalizeSettings(data: unknown): {
  form: SettingsForm;
  notifications: NotificationState;
} {
  const root = asRecord(data);

  const notifications = asRecord(
    root.notifications
  );

  return {
    form: {
      companyName:
        asString(root.companyName) ||
        "Company Name",

      email:
        asString(root.email) || "",

      companyPhone:
        asString(root.companyPhone) || "",

      address:
        asString(root.address) || "",
    },

    notifications: {
      email: asBoolean(
        notifications.email,
        true
      ),
      push: asBoolean(
        notifications.push,
        true
      ),
    },
  };
}

function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onChange}
      className={`relative h-6 w-12 rounded-full transition disabled:cursor-not-allowed disabled:opacity-60 ${
        checked
          ? "bg-[#2396ec]"
          : "bg-slate-300"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          checked
            ? "left-[26px]"
            : "left-0.5"
        }`}
      />
    </button>
  );
}

function FieldEditor({
  label,
  value,
  name,
  editing,
  onEdit,
  onChange,
  type,
  children,
}: PropsWithChildren<{
  label: string;
  value: string;
  name: keyof SettingsForm;
  editing: boolean;
  onEdit: () => void;
  onChange: (
    name: keyof SettingsForm,
    value: string
  ) => void;
  type?: string;
}>) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-800">
          {label}
        </label>

        <button
          onClick={onEdit}
          className="text-sm font-medium text-[#006bb6] underline"
        >
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      <input
        type={type || "text"}
        value={value}
        disabled={!editing}
        onChange={(event) =>
          onChange(name, event.target.value)
        }
        className="h-10 w-full rounded-md bg-[#eef4ff] px-4 text-slate-700 outline-none ring-[#2396ec]/30 transition focus:ring-2 disabled:text-slate-500"
      />

      <div className="h-1">
        {children}
      </div>
    </div>
  );
}

export default function CompanySettingsPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCollegeSettings();

  const updateSettings =
    useUpdateCollegeSettings();

  const updateNotifications =
    useUpdateCollegeNotifications();

  const normalized = useMemo(
    () => normalizeSettings(data),
    [data]
  );

  const [form, setForm] =
    useState<SettingsForm>(
      normalized.form
    );

  const [notifications, setNotifications] =
    useState<NotificationState>(
      normalized.notifications
    );

  const [editingField, setEditingField] =
    useState<keyof SettingsForm | null>(
      null
    );

  const [message, setMessage] =
    useState<string | null>(null);

  const [formErrors, setError] =
    useState({
      email: "",
    });

  useEffect(() => {
    setForm(normalized.form);
    setNotifications(
      normalized.notifications
    );
  }, [normalized]);

  async function saveSettings() {
    if (
      !form?.email.includes("@") ||
      !form?.email.includes(".com")
    ) {
      setError({
        email: "please check your e-mail",
      });

      return;
    }

    setError({
      email: "",
    });

    setMessage(null);

    await updateSettings.mutateAsync(
      form
    );

    setEditingField(null);

    setMessage("Settings saved.");
  }

  async function toggleNotification(
    key: keyof NotificationState
  ) {
    setMessage(null);

    const next = {
      ...notifications,
      [key]: !notifications[key],
    };

    setNotifications(next);

    try {
      await updateNotifications.mutateAsync(
        next
      );

      setMessage(
        "Notification preferences updated."
      );
    } catch (err) {
      setNotifications(notifications);

      setMessage(
        err instanceof Error
          ? err.message
          : "Update failed."
      );
    }
  }

  const isSaving =
    updateSettings.isPending ||
    updateNotifications.isPending;

  return (
    <div className="min-h-screen bg-[#eef4ff] text-slate-950">
      <CompanyAccountSidebar />
      <div className="ml-[220px] flex min-h-[calc(100vh-68px)]">
        <main className="relative flex-1 overflow-hidden px-6 py-10 md:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_98%_25%,rgba(255,255,255,0.8),transparent_28%),radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.55),transparent_32%)]" />

          <div className="relative w-full px-16">
            <h1 className="text-4xl font-extrabold text-slate-950">
              Settings
            </h1>

            {isLoading ? (
              <div className="mt-10 rounded-lg bg-white p-8 text-slate-600 shadow-sm">
                Loading settings...
              </div>
            ) : isError ? (
              <div className="mt-10 rounded-lg border border-red-200 bg-red-50 p-8 text-red-700">
                <p>
                  {error instanceof Error
                    ? error.message
                    : "Failed to load settings."}
                </p>

                <button
                  onClick={() => refetch()}
                  className="mt-4 rounded-md bg-red-600 px-4 py-2 font-semibold text-white"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <section className="mt-12">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      Company Information
                    </h2>

                    <button
                      type="button"
                      onClick={saveSettings}
                      disabled={isSaving}
                      className="rounded-md bg-[#087bd3] px-5 py-2 font-semibold text-white disabled:opacity-60"
                    >
                      {updateSettings.isPending
                        ? "Saving..."
                        : "Save Changes"}
                    </button>
                  </div>

                  <div className="rounded-2xl bg-white p-7 shadow-sm">
                    <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
                      <FieldEditor
                        label="Company Name"
                        name="companyName"
                        value={form.companyName}
                        editing={
                          editingField ===
                          "companyName"
                        }
                        onEdit={() =>
                          setEditingField(
                            editingField ===
                              "companyName"
                              ? null
                              : "companyName"
                          )
                        }
                        onChange={(
                          name,
                          value
                        ) =>
                          setForm(
                            (current) => ({
                              ...current,
                              [name]: value,
                            })
                          )
                        }
                      />

                      <FieldEditor
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        editing={
                          editingField ===
                          "email"
                        }
                        onEdit={() =>
                          setEditingField(
                            editingField ===
                              "email"
                              ? null
                              : "email"
                          )
                        }
                        onChange={(
                          name,
                          value
                        ) =>
                          setForm(
                            (current) => ({
                              ...current,
                              [name]: value,
                            })
                          )
                        }
                      >
                        {formErrors.email && (
                          <span className="text-red-600">
                            {
                              formErrors.email
                            }
                          </span>
                        )}
                      </FieldEditor>

                      <FieldEditor
                        label="Phone Number"
                        name="companyPhone"
                        value={form.companyPhone}
                        editing={
                          editingField ===
                          "companyPhone"
                        }
                        onEdit={() =>
                          setEditingField(
                            editingField ===
                              "companyPhone"
                              ? null
                              : "companyPhone"
                          )
                        }
                        onChange={(
                          name,
                          value
                        ) =>
                          setForm(
                            (current) => ({
                              ...current,
                              [name]: value,
                            })
                          )
                        }
                      />

                      <FieldEditor
                        label="Address"
                        name="address"
                        value={form.address}
                        editing={
                          editingField ===
                          "address"
                        }
                        onEdit={() =>
                          setEditingField(
                            editingField ===
                              "address"
                              ? null
                              : "address"
                          )
                        }
                        onChange={(
                          name,
                          value
                        ) =>
                          setForm(
                            (current) => ({
                              ...current,
                              [name]: value,
                            })
                          )
                        }
                      />
                    </div>
                  </div>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-bold">
                    Notification Preferences
                  </h2>

                  <div className="mt-5 rounded-2xl bg-white px-7 py-3 shadow-sm">
                    {[
                      {
                        key: "email" as const,
                        label:
                          "Email Notifications",
                        description:
                          "Receive updates about internships and announcements.",
                      },
                      {
                        key: "push" as const,
                        label:
                          "Push Notifications",
                        description:
                          "Get instant alerts for important updates.",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.key}
                        className={`flex items-center justify-between gap-5 py-6 ${
                          index > 0
                            ? "border-t border-blue-100"
                            : ""
                        }`}
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">
                            {item.label}
                          </h3>

                          <p className="mt-1 text-base text-slate-500">
                            {
                              item.description
                            }
                          </p>
                        </div>

                        <Toggle
                          checked={
                            notifications[
                              item.key
                            ]
                          }
                          disabled={
                            updateNotifications.isPending
                          }
                          onChange={() =>
                            toggleNotification(
                              item.key
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {message ? (
                  <p className="mt-5 text-sm font-semibold text-[#087bd3]">
                    {message}
                  </p>
                ) : null}

                {updateSettings.error ? (
                  <p className="mt-3 text-sm font-semibold text-red-600">
                    {
                      updateSettings.error
                        .message
                    }
                  </p>
                ) : null}

                {updateNotifications.error ? (
                  <p className="mt-3 text-sm font-semibold text-red-600">
                    {
                      updateNotifications
                        .error.message
                    }
                  </p>
                ) : null}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}