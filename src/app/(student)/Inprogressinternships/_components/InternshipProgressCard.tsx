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
    <div className="bg-white/60 backdrop-blur  rounded-r-2xl  shadow-sm relative">
      <div className="flex gap-6">
        {/* Image */}
        <Image
  src={us}
  alt="internship"
  className=" w-64 "
/>
          {isCompleted && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
              Completed
            </span>
          )}

        {/* Content */}
        <div className="flex-1 p-4">
          <span className="text-sm text-blue-600 font-medium">
            {week}
          </span>

          <h3 className="text-xl font-semibold mt-1">{title}</h3>
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
          <div className="flex gap-3 mt-4">
            {isCompleted ? (
              <button className="px-6 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2">
                ⬇ Download Certificate
              </button>
            ) : (
              <>
                <button className="px-6 py-2 rounded-lg bg-blue-600 text-white">
                  Manage Tasks
                </button>
                <button
                  disabled
                  className="px-6 py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed"
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
