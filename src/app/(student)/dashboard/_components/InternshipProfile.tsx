"use client";

type Props = {
  title: string;
  company: string;
  location: string;
  progress: number;
  type: string[];
};
import { ArrowRight } from "lucide-react";
import us from '../_components/User Dashboard Overview-after_edit.png'
import Image from "next/image";

export default function InternshipCard({
  title,
  company,
  location,
  progress,
  type,
}: Props) {
  return (
    <div className="flex gap-2 rounded-2xl border bg-white/60 backdrop-blur  shadow-sm">
      <div className="w-24  flex items-center rounded-2xl justify-center h-full p-5 pr-0 ">
      <Image src={us} className="w-full h-[50%] rounded-2xl" alt='company image'></Image>
      </div>
    <div className="flex-1 p-5">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex gap-2 mb-2">
            {type.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full  text-blue-600"
              >
                {t}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">
            {company} | {location}
          </p>
        </div>

        <button className="  flex justify-center items-center text-center text-blue-500    ">
          <ArrowRight size={40} className="rounded-full w-12 h-12 p-[4px]  border-blue-700 border   "></ArrowRight>
        </button>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-transparent">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
    </div>
  );
}
