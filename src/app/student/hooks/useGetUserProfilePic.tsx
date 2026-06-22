import { useQuery } from "@tanstack/react-query"
import getUserPorfilePicture from "../actions/getUserProfilePic"


export default function UseGetUserProfilePicture(isEnabled:boolean){
    return useQuery({
        queryKey:['userProfilePic'],
        queryFn:()=>getUserPorfilePicture(),
        enabled:isEnabled
    })
}