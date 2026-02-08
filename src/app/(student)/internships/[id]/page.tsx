import { notFound } from "next/navigation"
import { INTERNSHIPS } from "@/app/internships/_data/internships"
import InternshipDetails from "./_components/internship-details"

export default function InternshipDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const data = INTERNSHIPS.find((x) => x.id === params.id)
  if (!data) return notFound()

  return <InternshipDetails data={data} />
}
