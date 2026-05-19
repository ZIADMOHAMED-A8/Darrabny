// components/JobCard.tsx
import Image from "next/image";
import { MapPin, Briefcase, Calendar } from "lucide-react";
interface JobCardProps {
  _id: string;
  internshipTitle: string;
  internshipLocation: string;
  workingTime: string;
  internshipDescription: string;
  durationInMonths: number;
  thumbnail: string;
  postedAgo?: string;
}

export default function JobCard({
  internshipTitle,
  internshipLocation,
  workingTime,
  durationInMonths,
  thumbnail,
  postedAgo,
}: JobCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl max-w-lg">
      {/* Logo */}
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
        <Image
          src={thumbnail}
          alt={internshipTitle}
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-sm text-neutral-500 truncate">{postedAgo}</p>

        <p className="text-base font-semibold text-neutral-900 dark:text-white truncate">
          {internshipTitle}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <MapPin size={13} />
            {internshipLocation}
          </span>

          <span className="text-neutral-300">·</span>

          <span className="flex items-center gap-1">
            <Briefcase size={13} />
            {workingTime}
          </span>

          <span className="text-neutral-300">·</span>

          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {durationInMonths} months
          </span>
        </div>
      </div>
    </div>
  );
}
