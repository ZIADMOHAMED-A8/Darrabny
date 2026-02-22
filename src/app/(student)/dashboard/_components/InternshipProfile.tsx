"use client";

type Props = {
  title: string;
  company: string;
  location: string;
  progress: number;
  type: string[];
};

export default function InternshipCard({
  title,
  company,
  location,
  progress,
  type,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white/60 backdrop-blur p-5 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex gap-2 mb-2">
            {type.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600"
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

        <button className="  flex justify-center items-center text-center text-blue-500 text-5xl    ">
          →
        </button>
      </div>

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
    </div>
  );
}
