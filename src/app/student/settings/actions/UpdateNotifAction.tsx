"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type UpdateNotifPayload = {
  email: boolean;
  push: boolean;
};

export default async function updateNotifAction(values: UpdateNotifPayload) {
  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }
  const res = await fetch("http://localhost:5000/user/myNotifications", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    body: JSON.stringify({
      email: values.email,
      push: values.push,
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to update notifications");
  }

  return res.json();
}
