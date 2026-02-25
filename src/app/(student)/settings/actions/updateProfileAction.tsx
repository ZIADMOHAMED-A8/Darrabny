"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type UpdateProfilePayload = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
};

export default async function updateProfileAction(
  values: UpdateProfilePayload,
) {
  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  const requestBody = {
    // fullName: values.fullName,
    // email: values.email,
    // phoneNumber: values.phone,
    mobileNumber: values.phone,
    address: values.address,
    // notifications: {
    //   email: values.emailNotifications,
    //   push: values.pushNotifications,
    //   sms: values.smsNotifications,
    // },
  };

  const res = await fetch("http://localhost:5000/user/UpdateAccount", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to update profile");
  }

  return res.json();
}
