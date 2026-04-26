import { getToken } from "@/lib/utils/get-token.util";
import InternshipDetailPage from "./_components/internship-detail-page";


async function getInternship(id: string) {

  const token = await getToken();
  console.log("token :::::::::" , token);
  
  const res = await fetch(`http://localhost:5000/internship/${id}`, {
    headers: {
      Authorization: `company ${token?.token}`,
    },
  });
  console.log("res :::::::::" , res);
  

  const json = await res.json();
  console.log("json :::::::::" , json);
  
  if (!res.ok) {
    throw new Error("Failed to fetch internship");
  }
  return json.data;
}

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const data = await getInternship(params.id);

  return <InternshipDetailPage data={data} />;
}