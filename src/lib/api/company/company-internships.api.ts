import { getToken } from "@/lib/utils/get-token.util";

export async function getInternships() {
  const token = await getToken();
  console.log(token);
  
  const res = await fetch(
    "http://localhost:5000/Internship/companyInternships",
    {
      headers: {
        authorization: `company ${token?.token}`,
      },
    },
  );
  const data = await res.json();
  console.log("data ::", data);
  
  return data?.data ?? [];
}
