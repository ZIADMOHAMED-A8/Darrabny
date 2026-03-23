"use server";
import { getToken } from "@/lib/utils/get-token.util";

export async function addInternshipAction(formData: FormData) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const token = await getToken(); // 👈 هنا

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  console.log("token from action", token.token);

  const response = await fetch(`${baseUrl}/Internship/add`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `company ${token.token}`,
    },
  });

  const data = await response.json();
  console.log("response data", data);
  console.log(response);


  if (!response.ok) {
    throw new Error(data?.message || "Failed to add internship");
  }

  return data;
}
