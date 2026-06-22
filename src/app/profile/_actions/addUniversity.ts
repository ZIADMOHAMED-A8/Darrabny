"use server"
import { getToken } from "@/lib/utils/get-token.util"

export default async function addUniversity(id: string) {
    const token=await getToken()
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/student/college`, {
        method:'PATCH',
        headers: {
            Authorization: `user ${token?.token.accessToken}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify({ collegeId: id }), 

        
        
    })
    let data=await res.json()
    if(!res.ok){
        throw new Error(data.message ?? "failed to add your university")
    }
    return data
}