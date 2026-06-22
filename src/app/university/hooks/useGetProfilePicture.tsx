import { useQuery } from "@tanstack/react-query"
import getPorfilePicture from "../actions/getProfilePicture"

export default function UseGetCollegeProfilePicture(isEnabled:boolean){
    return useQuery({
        queryKey:['collegeProfilePic'],
        queryFn:()=>getPorfilePicture(),
        enabled:isEnabled
    })
}