import { useQuery } from "@tanstack/react-query"
import getPorfilePicture from "../actions/getProfilePicture"

export default function UseGetProfilePicture(isEnabled:boolean){
    return useQuery({
        queryKey:['comapnyProfilePic'],
        queryFn:()=>getPorfilePicture(),
        enabled:isEnabled
    })
}