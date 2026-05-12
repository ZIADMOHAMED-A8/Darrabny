import { useQuery } from "@tanstack/react-query";
import getInternshipDetails from "../actions/getInternshipDetailsAction";
export default function UseGetInternshipDetails(id?: string) {
  return useQuery({
    queryKey: ["companyInternshipDetails", id],
    enabled: typeof id === "string" && id.length > 0, 
    queryFn: () => getInternshipDetails(id as string),
  });
}
