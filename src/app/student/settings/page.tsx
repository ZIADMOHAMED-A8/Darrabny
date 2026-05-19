"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NotificationSettings from "./_components/NotificationSettings";
import PersonalInfoForm from "./_components/PersonalInfoForm";
import useUpdateProfile from "./hooks/useUpdateInfo";
import useUpdateNotif from "./hooks/useUpdateNotif";
import useUpdateFullName from "./hooks/useUpdateFullName";
import useGetUser from "@/app/student/hooks/useGetLoginUser";
export type SettingsFormValues = {
  fullName: string;
  email: string;
  phone: string;
  address: {
    city:string,
    state:string
  };
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
};

export default function SettingsPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SettingsFormValues>({
    defaultValues: {
      fullName: "Sophia Chen",
      email: "sophia.chen@example.com",
      phone: "(123) 456-7890",
      address: "",
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
    },
  });

  const { updateProfile, isPending: isProfilePending, error: profileError } = useUpdateProfile();
  const { updateNotif, isPending: isNotifPending, error: notifError } = useUpdateNotif();
  const { updateFullName, isPending: isFullNamePending, error: fullNameError } = useUpdateFullName();
  const {
    data: userData,
    isLoading,
    error: userError,
    isError,
    refetch,
  } = useGetUser();

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
    setSubmitError(null);

    try {
      const user = userData?.data ?? userData?.user ?? userData;

      await updateFullName({
        fullName: data.fullName,
        links: user?.links ?? {},
      });
      await updateProfile(data);
      await updateNotif({
        email: data.emailNotifications,
        push: data.pushNotifications,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to save settings. Please try again.",
      );
    }
  };

  if (isLoading) {
    return <p>Loading settings...</p>;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        <p className="mb-3 text-sm">
          {userError instanceof Error
            ? userError.message
            : "Failed to load settings data."}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium hover:bg-red-100"
        >
          Retry
        </button>
      </div>
    );
  }

    return (
    
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
      <h1 className="text-3xl font-bold">Settings</h1>

      <PersonalInfoForm form={form} />
      <NotificationSettings form={form} />

      {profileError ? (
        <p className="text-sm text-red-600">{profileError.message}</p>
      ) : null}
      {notifError ? (
        <p className="text-sm text-red-600">{notifError.message}</p>
      ) : null}
      {fullNameError ? (
        <p className="text-sm text-red-600">{fullNameError.message}</p>
      ) : null}
      {userError && !isError ? (
        <p className="text-sm text-red-600">{userError.message}</p>
      ) : null}
      {submitError ? (
        <p className="text-sm text-red-600">{submitError}</p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isProfilePending || isNotifPending || isFullNamePending}
          className="px-6 py-2 z-10 rounded-lg bg-blue-600 text-white disabled:opacity-60"
        >
          {isProfilePending || isNotifPending || isFullNamePending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
