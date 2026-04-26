"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getLoginStudentAction() {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch("http://localhost:5000/student/getLoginStudent", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to get login student");
  }

  return res.json();
}
