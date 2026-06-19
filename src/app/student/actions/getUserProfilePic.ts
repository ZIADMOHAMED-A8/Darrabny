"use server"

import { getToken } from "@/lib/utils/get-token.util";

export default async function getUserPorfilePicture(){
    let token=await getToken()
    console.log(token?.token)
    if (!token) {
        throw new Error("Unauthorized: No token found");
      }
      console.log('token zzz',token)
    let res=await fetch('http://localhost:5000/user/profilePic',{
        method:'GET',
        headers:{
            Authorization: `user ${token.token.accessToken}`,
        }
    })
    let data=await res.json()
    if(!res.ok){
        throw new Error(data?.message ?? " Failed to get profile picture")
    }
    return data
}





