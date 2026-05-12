"use client"
import InternshipDetailPage from "./_components/internship-detail-page";
import { useParams } from "next/navigation";
import UseGetInternshipDetails from './hooks/UseGetInternshipDetails';



export default  function Page() {
  const {id}=useParams()
  if(!id || Array.isArray(id)){return} 
  const{data,isPending}=UseGetInternshipDetails(id)
  if(isPending){return<p>loading...</p>}
  return <InternshipDetailPage data={data} />;
}