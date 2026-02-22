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
  const token=await getToken()
  console.log("token from action :",token);
  if (!token) {
  throw new Error("Unauthorized");
}
  const res = await fetch('http://localhost:5000/user/UpdateAccount', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization:`user ${token.token.accessToken}`
    },
    body: JSON.stringify({
    "mobileNumber": "01272526881",
      "address": {
    "country": "asafraaa",
    "city": "Cairo"
  }
}),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to update profile");
  }

  return res.json();
}
