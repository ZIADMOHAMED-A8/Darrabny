import { useQuery } from "@tanstack/react-query"
import getPorfilePicture from "../actions/getProfilePicture"

export default function UseGetCollegeProfilePicture(){
    return useQuery({
        queryKey:['collegeProfilePic'],
        queryFn:()=>getPorfilePicture()
    })
}