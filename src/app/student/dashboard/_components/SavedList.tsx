"use client"
import { useRouter } from 'next/navigation'
type Props = {
  title: string;
  company: string;
  id:string
};

export default function SavedList({ title, company,id }: Props) {
const router = useRouter()

  return (
    <div onClick={()=>{
      router.push(`/student/internships/${id}`)
    }} className="flex gap-3 cursor-pointer items-start">
      <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
        🔖
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{company}</p>
      </div>
    </div>
  );
}
