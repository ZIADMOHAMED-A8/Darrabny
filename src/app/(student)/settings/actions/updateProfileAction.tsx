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

  const [cityRaw, countryRaw] = values.address.split(",");
  const city = cityRaw?.trim();
  const country = countryRaw?.trim();

  if (!city || !country) {
    throw new Error("Address must be in format: City,Country");
  }

  const requestBody = {
    mobileNumber: values.phone,
    address: {
      country,
      city,
    },
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
