type Step = {
  label: string;
  date: string;
  status: string;
};

export default function ApplicationTimeline({ steps }: { steps: Step[] }) {
  const getColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500 text-green-600";
      case "rejected":
        return "bg-red-500 text-red-600";
      case "under-review":
      case "applied":
        return "bg-blue-500 text-blue-600";
      default:
        return "bg-gray-300 text-gray-400";
    }
  };

  return (
    <div className="relative ">


<div className="relative">
  {steps.map((step, i) => {
    const isLast = i === steps.length - 1;

    return (
      <div key={i} className="flex gap-4 relative">
        {/* Icon + line */}
        <div className="flex flex-col items-center">
          {/* Circle */}
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${
              step.status === "accepted"
                ? "bg-green-500"
                : step.status === "rejected"
                ? "bg-red-500"
                : step.status === "pending"
                ? "bg-gray-300"
                : "bg-blue-500"
            }`}
          >
            ✓
          </div>

          {/* Line (only if NOT last) */}
          {!isLast && (
            <div className="w-[2px] flex-1 bg-blue-500" />
          )}
        </div>

        {/* Content */}
        <div className="pb-6">
          <p
            className={`font-medium ${
              step.status === "accepted"
                ? "text-green-600"
                : step.status === "rejected"
                ? "text-red-600"
                : ""
            }`}
          >
            {step.label}
          </p>

          {step.date && (
            <p className="text-sm text-gray-500">{step.date}</p>
          )}
        </div>
      </div>
    );
  })}
</div>

    </div>
  );
}
