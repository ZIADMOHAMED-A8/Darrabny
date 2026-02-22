"use server"

import { getToken } from "@/lib/utils/get-token.util";


export default async function getLoginUserAction() {
      const token=await getToken()
      if (!token) {
      throw new Error("Unauthorized");
    }
      const res = await fetch('http://localhost:5000/user/getLoginUser', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:`user ${token}`
        },
      });
    
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to get user");
      }
}