"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function uploadProfilePicAction(formData: FormData) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/user/uploadProfilePic`;
  const authHeader = { Authorization: `user ${token.token.accessToken}` };

  const sendRequest = () =>
    fetch(endpoint, {
      method:'PATCH',
      headers: authHeader,
      body: formData,
    });

  let res = await sendRequest();
 

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const errorJson = await res.json();
      throw new Error(
        errorJson?.message || errorJson?.error || "Failed to upload profile picture",
      );
    }

    const message = await res.text();
    throw new Error(message || "Failed to upload profile picture");
  }

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return { success: true };
}
