"use client";

import { useForm } from "react-hook-form";
import NotificationSettings from "./_components/NotificationSettings";
import PersonalInfoForm from "./_components/PersonalInfoForm";


export type SettingsFormValues = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
};

export default function SettingsPage() {
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      fullName: "Sophia Chen",
      email: "sophia.chen@example.com",
      phone: "(123) 456-7890",
      address: "San Francisco, CA",
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    console.log("SETTINGS DATA", data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-10"
    >
      <h1 className="text-3xl font-bold">Settings</h1>

      <PersonalInfoForm form={form} />
      <NotificationSettings form={form} />

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 z-10 rounded-lg bg-blue-600 text-white"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
