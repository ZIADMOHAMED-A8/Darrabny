import us from '../_components/User Dashboard Overview-after_edit.png'
import Image from "next/image";
type Props = {
  title: string;
  company: string;
  mode: string;
  progress: number;
  week: string;
  status: "in-progress" | "completed";
};

export default function InternshipProgressCard({
  title,
  company,
  mode,
  progress,
  week,
  status,
}: Props) {
  const isCompleted = status === "completed";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/60 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {/* Image */}
        <Image
  src={us}
  alt="internship"
  className="h-44 w-full object-cover sm:h-auto sm:w-48 md:w-64"
/>
          {isCompleted && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
              Completed
            </span>
          )}

        {/* Content */}
        <div className="min-w-0 flex-1 p-4">
          <span className="text-sm text-blue-600 font-medium">
            {week}
          </span>

          <h3 className="mt-1 text-lg font-semibold sm:text-xl">{title}</h3>
          <p className="text-gray-500 text-sm">
            {company} | {mode}
          </p>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {isCompleted ? (
              <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white sm:px-6">
                ⬇ Download Certificate
              </button>
            ) : (
              <>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white sm:px-6">
                  Manage Tasks
                </button>
                <button
                  disabled
                  className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2 text-gray-400 sm:px-6"
                >
                  Logbook
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
