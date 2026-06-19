"use server"

import { getToken } from "@/lib/utils/get-token.util";

export default async function getPorfilePicture(){
    let token=await getToken()
    if (!token) {
        throw new Error("Unauthorized: No token found");
      }
      console.log('token zzz',token)
    let res=await fetch('http://localhost:5000/college/logo',{
        method:'GET',
        headers:{
            Authorization: `college ${token.token}`,
        }
    })
    let data=await res.json()
    if(!res.ok){
        throw new Error(data?.message ?? " Failed to get profile picture")
    }
    return data
}





