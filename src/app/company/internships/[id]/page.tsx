"use client"
import InternshipDetailPage from "./_components/internship-detail-page";
import { useParams } from "next/navigation";
import UseGetInternshipDetails from './hooks/UseGetInternshipDetails';



export default  function Page() {
  const {id}=useParams()
  if(!id || Array.isArray(id)){return} 
  const{data,isPending,isError,error}=UseGetInternshipDetails(id)
  if(isPending){return<p>loading...</p>}
  if(isError){return<p className="text-red-600">{error.message}</p>}
  return <InternshipDetailPage data={data} />;
}