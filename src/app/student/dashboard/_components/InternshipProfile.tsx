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
    <div className="flex flex-col gap-2 rounded-2xl border bg-white/60 shadow-sm backdrop-blur sm:flex-row">
      <div className="flex h-36 w-full items-center justify-center rounded-2xl p-4 sm:h-auto sm:w-24 sm:pr-0">
      <Image src={us} className="h-full w-full rounded-2xl object-cover sm:h-[50%]" alt='company image'></Image>
      </div>
    <div className="flex-1 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap gap-2">
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

        <button className="flex items-center justify-center self-start text-center text-blue-500 sm:self-auto">
          <ArrowRight size={40} className="h-10 w-10 rounded-full border border-blue-700 p-[4px] sm:h-12 sm:w-12"></ArrowRight>
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
