"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import {
  settingsSchema,
  type SettingsValues,
} from "../validations/settings.schema";
import { useUpdateCompanySettings } from "../hooks/use-update-company-settings";
import { useUpdateNotificationSettings } from "../hooks/use-update-notification-settings";

type CompanySettingsFormValues = SettingsValues & {
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  };
};

const styles = {
  input:
    "h-11 rounded-md border border-[#d6dbe7] bg-[#f7f8fc] px-3 text-sm text-slate-600 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0",
  title: "text-[34px] font-extrabold text-[#0f1b33]",
  fieldLabel: "text-xs font-medium text-slate-500",
};

const profileFields: Array<{
  name: keyof SettingsValues;
  label: string;
  type?: "text" | "email";
}> = [
  { name: "companyName", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "address", label: "Address", type: "text" },
];

const notificationRows = [
  {
    key: "email",
    title: "Email Notifications",
    description:
      "Receive updates about new internships, application status changes, and platform announcements.",
  },
  {
    key: "push",
    title: "Push Notifications",
    description: "Get instant alerts for important updates and reminders.",
  },
  {
    key: "sms",
    title: "SMS Notifications",
    description: "Receive SMS notifications for urgent updates and reminders.",
  },
] as const;

export default function CompanySettingsForm({
  defaultValues,
}: {
  defaultValues: CompanySettingsFormValues;
}) {
  const [editable, setEditable] = React.useState<
    Record<keyof SettingsValues, boolean>
  >({
    companyName: false,
    email: false,
    phone: false,
    address: false,
  });

  const [notifications, setNotifications] = React.useState({
    email: Boolean(defaultValues.notifications?.email),
    push: Boolean(defaultValues.notifications?.push),
    sms: Boolean(defaultValues.notifications?.sms),
  });

  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: defaultValues.companyName || "",
      email: defaultValues.email || "",
      phone: defaultValues.phone || "",
      address: defaultValues.address || "",
    },
  });

  React.useEffect(() => {
    form.reset({
      companyName: defaultValues.companyName || "",
      email: defaultValues.email || "",
      phone: defaultValues.phone || "",
      address: defaultValues.address || "",
    });

    setNotifications({
      email: Boolean(defaultValues.notifications?.email),
      push: Boolean(defaultValues.notifications?.push),
      sms: Boolean(defaultValues.notifications?.sms),
    });
  }, [
    defaultValues.companyName,
    defaultValues.email,
    defaultValues.phone,
    defaultValues.address,
    defaultValues.notifications?.email,
    defaultValues.notifications?.push,
    defaultValues.notifications?.sms,
    form,
  ]);

  const { updateCompanySettings, isPending } =
    useUpdateCompanySettings() as any;
  const { updateNotificationSettings, isPending: isNotificationsPending } =
    useUpdateNotificationSettings() as any;

  const enableField = (name: keyof SettingsValues) => {
    setEditable((prev) => ({ ...prev, [name]: true }));
  };

  const onSubmit = (values: SettingsValues) => {
    updateCompanySettings({
      name: values.companyName,
      email: values.email,
      phone: values.phone,
      address: values.address,
    });
  };

  const onToggleNotification = (
    key: "email" | "push" | "sms",
    checked: boolean,
  ) => {
    const next = { ...notifications, [key]: checked };
    setNotifications(next);
    updateNotificationSettings({ notifications: next });
  };

  return (
    <div className="space-y-7">
      <section>
        <h3 className={styles.title}>Personal Information</h3>

        <div className="mt-4 rounded-2xl border border-[#d8dfec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {profileFields.map((item) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-2 flex items-center justify-between">
                          <Label className={styles.fieldLabel}>
                            {item.label}
                          </Label>
                          <button
                            type="button"
                            onClick={() => enableField(item.name)}
                            className="text-xs font-semibold text-[#0d6db6] hover:text-[#0b5f9f]"
                          >
                            Edit
                          </button>
                        </div>

                        <FormControl>
                          <Input
                            {...field}
                            type={item.type || "text"}
                            readOnly={!editable[item.name]}
                            className={`${styles.input} read-only:cursor-not-allowed`}
                          />
                        </FormControl>

                        <FormMessage className="text-[#B00020]" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-10 rounded-md bg-[#1E90FF] px-6 hover:bg-[#187bcd]"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>

      <section>
        <h3 className={styles.title}>Notification Preferences</h3>

        <div className="mt-4 rounded-2xl border border-[#d8dfec] bg-white px-4 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          {notificationRows.map((item, index) => (
            <div
              key={item.key}
              className={[
                "flex items-center justify-between gap-6 px-2 py-4",
                index !== notificationRows.length - 1
                  ? "border-b border-[#d8dfec]"
                  : "",
              ].join(" ")}
            >
              <div>
                <p className="text-[17px] font-semibold text-[#1e293b]">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>

              <Switch
                checked={Boolean(notifications[item.key])}
                disabled={isNotificationsPending}
                onCheckedChange={(checked) =>
                  onToggleNotification(item.key, checked)
                }
                className="data-[state=checked]:bg-[#2e8de1] data-[state=unchecked]:bg-[#d2d7e2]"
              />
            </div>
          ))}
        </div>
      </section>

      <Separator className="opacity-0" />
    </div>
  );
}
