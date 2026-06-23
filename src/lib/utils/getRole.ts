import { cookies } from "next/headers";

export async function getRole() {
  const cookieStore = cookies();

  const role =
    cookieStore.get("role")?.value 
    

  if (!role) return null;

 

  return role;
}