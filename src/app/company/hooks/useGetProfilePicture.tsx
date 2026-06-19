import { useQuery } from "@tanstack/react-query"
import getPorfilePicture from "../actions/getProfilePicture"

export default function UseGetProfilePicture(){
    return useQuery({
        queryKey:['comapnyProfilePic'],
        queryFn:()=>getPorfilePicture()
    })
}