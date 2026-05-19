function formatDate(date: string) {
    if (!date || date.toLowerCase() === "present") return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  
  function BriefcaseIcon() {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    );
  }
  
  function CompanyIcon() {
    return (
      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      </div>
    );
  }
  
  export default function ProfessionalExperience({ items }: any) {
    return (
      <div>
        <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-slate-500">
            <BriefcaseIcon />
          </span>
          Professional Experience
        </h2>
  
        <div className="space-y-3">
          {items?.length > 0 ? (
            items.map((item: any, index: number) => {
              const isOngoing = item.status?.toLowerCase() === "ongoing";
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <CompanyIcon />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {item.companyName}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.role || "Role not provided"}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          {/* Calendar icon */}
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          {formatDate(item.startDate)} – {formatDate(item.endDate)}
                          {item.duration && <span className="text-slate-300">·</span>}
                          {item.duration && <span>{item.duration}</span>}
                        </span>
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
                            </svg>
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
  
                  {/* Status badge */}
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold ${
                      isOngoing
                        ? "bg-[#EBF5FF] text-[#0070CC] border border-[#C0DCFF]"
                        : "bg-[#EAFBF3] text-[#059669] border border-[#B6EDD6]"
                    }`}
                  >
                    {isOngoing ? "Ongoing" : (
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Completed
                      </span>
                    )}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 text-slate-400 border border-slate-100 text-sm text-center">
              No professional experience added.
            </div>
          )}
        </div>
      </div>
    );
  }