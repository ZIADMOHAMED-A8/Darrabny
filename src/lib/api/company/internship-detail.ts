import { getToken } from "@/lib/utils/get-token.util";


export async function getInternship(id: string) {
    const token = await getToken();
  try {
    const res = await fetch(`http://localhost:5000/internship/${id}`, {
      headers: {
        Authorization: `company ${token?.token}`,
        },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch internship");
    }

    const data = await res.json();
    return data.data; // عشان ترجع الداتا مباشرة
  } catch (error) {
    console.error(error);
    return null;
  }
}