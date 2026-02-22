import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import updateProfileAction, { UpdateProfilePayload } from "../actions/updateProfileAction";
import getLoginUserAction from "../actions/getLoginUserAction";

export default function useGetUser() {
    const{data,error,isLoading}=useQuery({
        queryKey:['getUser']
        ,queryFn:getLoginUserAction
    })
  return { isPending, error, data:userData };
}
