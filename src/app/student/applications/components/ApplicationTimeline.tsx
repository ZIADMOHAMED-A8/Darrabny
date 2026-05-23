type Step = {
  label: string;
  date: string;
  status: string;
};

const ORDERED_STAGES = ["applied", "under-review", "accepted", "rejected"];

const stageMeta: Record<string, { icon: string; dotClass: string; labelClass: string }> = {
  applied: {
    icon: "✓",
    dotClass: "bg-blue-100 border-2 border-blue-400 text-blue-600",
    labelClass: "text-blue-600",
  },
  "under-review": {
    icon: "✓",
    dotClass: "bg-amber-100 border-2 border-amber-400 text-amber-700",
    labelClass: "text-amber-700",
  },
  accepted: {
    icon: "✓",
    dotClass: "bg-green-100 border-2 border-green-500 text-green-700",
    labelClass: "text-green-700",
  },
  rejected: {
    icon: "✕",
    dotClass: "bg-red-100 border-2 border-red-400 text-red-600",
    labelClass: "text-red-600",
  },
};

export default function ApplicationTimeline({ steps }: { steps: Step[] }) {
  // Build a map of status -> date from the actual steps data
  const stepMap = Object.fromEntries(steps.map((s) => [s.status, s.date]));

  // Determine the current (latest) status
  const latestStatus = steps.at(-1)?.status ?? "";
  const isRejected = latestStatus === "rejected";
  const latestIndex = ORDERED_STAGES.indexOf(latestStatus);

  // Show accepted/rejected depending on outcome, never both
  const stages = isRejected
    ? ["applied", "under-review", "rejected"]
    : ["applied", "under-review", "accepted"];

  return (
    <div className="flex flex-col">
      {stages.map((status, i) => {
        const isLast = i === stages.length - 1;
        const stageIndex = ORDERED_STAGES.indexOf(status);
        const isReached = stageIndex <= latestIndex;
        const isCurrent = status === latestStatus;
        const meta = stageMeta[status];
        const date = stepMap[status];

        return (
          <div key={status} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                  isReached
                    ? meta.dotClass
                    : "bg-gray-100 border-2 border-dashed border-gray-300 text-gray-300"
                }`}
              >
                {isReached ? meta.icon : "·"}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 min-h-[24px] ${
                    isReached && !isCurrent ? "bg-gray-300" : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            <div className="pb-6 pt-1">
              <p
                className={`text-sm font-medium leading-none ${
                  isReached ? meta.labelClass : "text-gray-300"
                }`}
              >
                {stageMeta[status] ? (
                  status === "applied" ? "Applied" :
                  status === "under-review" ? "Under Review" :
                  status === "accepted" ? "Accepted" : "Rejected"
                ) : status}
              </p>
              {date && isReached && (
                <p className="text-xs text-gray-400 mt-1">{date}</p>
              )}
              {!isReached && (
                <p className="text-xs text-gray-300 mt-1">Pending</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}