// app/internships/[id]/page.tsx

import { getToken } from "@/lib/utils/get-token.util";
import InternshipDetails from "./_components/internship-details";


async function getInternship(id: string) {

  const token = await getToken();
  console.log("token :::::::::" , token);
  
  const res = await fetch(`http://localhost:5000/internship/${id}`, {
    headers: {
      Authorization: `company ${token?.token}`,
    },
  });
  console.log(res);
  
  if (!res.ok) {
    throw new Error("Failed to fetch internship");
  }

  const json = await res.json();
  return json.data;
}
export default async function InternshipPage({
  params,
}: {
  params: { id: string };
}) {
  const internship = await getInternship(params.id);

  const role: "user" | "company" = "user";

  return <InternshipDetails data={internship} role={role} />;
}