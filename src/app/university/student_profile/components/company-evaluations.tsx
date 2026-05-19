function Stars({ rating, label }: { rating: number; label?: string }) {
    return (
      <div className="flex flex-col items-end gap-0.5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={i < rating ? "#F59E0B" : "none"}
              stroke={i < rating ? "#F59E0B" : "#CBD5E1"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        {label && (
          <span
            className={`text-[10px] font-semibold ${
              rating >= 5
                ? "text-amber-500"
                : rating >= 4
                ? "text-[#3CAD7D]"
                : "text-slate-400"
            }`}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
  
  function TrophyIcon() {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4a2 2 0 0 1-2-2V5h4" /><path d="M18 9h2a2 2 0 0 0 2-2V5h-4" />
        <path d="M6 9a6 6 0 0 0 12 0V3H6z" /><path d="M12 15v4" /><path d="M8 19h8" />
      </svg>
    );
  }
  
  const ratingLabels: Record<number, string> = {
    5: "Outstanding",
    4: "Strong",
    3: "Good",
    2: "Fair",
    1: "Poor",
  };
  
  export default function CompanyEvaluations({ items }: any) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-4">
        <h2 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="text-slate-500">
            <TrophyIcon />
          </span>
          Company Evaluations
        </h2>
  
        <div className="space-y-6">
          {items?.length > 0 ? (
            items.map((item: any, index: number) => (
              <div
                key={index}
                className={`${
                  index !== items.length - 1
                    ? "pb-6 border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      {item.companyName}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Reviewer: {item.reviewerName}
                      {item.reviewerRole && `, ${item.reviewerRole}`}
                    </p>
                  </div>
                  <Stars
                    rating={item.rating}
                    label={ratingLabels[item.rating]}
                  />
                </div>
  
                <div className="bg-slate-50 rounded-xl px-4 py-3 text-xs text-slate-600 leading-relaxed border border-slate-100">
                  "{item.reviewText}"
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">No evaluations available yet.</p>
          )}
        </div>
      </div>
    );
  }