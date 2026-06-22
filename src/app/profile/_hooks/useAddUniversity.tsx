import { useMutation } from "@tanstack/react-query";
import addUniversity from "../_actions/addUniversity";

export default function useAdduniversity(){
    return useMutation({
        mutationFn:(id:string)=>addUniversity(id)
    })
}