"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import NotificationSettings from "./_components/NotificationSettings";
import PersonalInfoForm from "./_components/PersonalInfoForm";
import useUpdateProfile from "./hooks/useUpdateInfo";
import useGetUser from "../hooks/useGetLoginUser";
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

  const { updateProfile, isPending, error } = useUpdateProfile();
  const { data: userData, isLoading, error: userError } = useGetUser();

  useEffect(() => {
    if (!userData) return;

    const currentValues = form.getValues();
    const user = userData?.data ?? userData?.user ?? userData;

    const fullNameFromParts = [user?.firstName, user?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    const addressValue =
      typeof user?.address === "string"
        ? user.address
        : [user?.address?.street, user?.address?.city, user?.address?.country]
            .filter(Boolean)
            .join(", ");

    form.reset({
      fullName: user?.fullName || fullNameFromParts || currentValues.fullName,
      email: user?.email || currentValues.email,
      phone: user?.phoneNumber || currentValues.phone,
      address: addressValue || currentValues.address,
      emailNotifications:
        user?.notifications.email ?? currentValues.emailNotifications,
      pushNotifications:
        user?.notifications.push ?? currentValues.pushNotifications,
      smsNotifications:
        user?.notifications.sms ?? currentValues.smsNotifications,
    });
  }, [userData, form]);

  const onSubmit = async (data: SettingsFormValues) => {
    await updateProfile(data);
  };

  if (isLoading) {
    return <p>loading</p>;
  }

  return (

    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
      <h1 className="text-3xl font-bold">Settings</h1>

      <PersonalInfoForm form={form} />
      <NotificationSettings form={form} />

      {error ? (
        <p className="text-sm text-red-600">{error.message}</p>
      ) : null}
      {userError ? (
        <p className="text-sm text-red-600">{userError.message}</p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 z-10 rounded-lg bg-blue-600 text-white disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
