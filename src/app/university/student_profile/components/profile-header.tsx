import { Download } from "lucide-react";

export default function ProfileHeader({ basicInfo }: any) {
  const initials = basicInfo?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("") ?? "?";

  return (
    <div className="bg-[#0B2545] rounded-2xl p-7 flex items-center justify-between text-white shadow-md">
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full bg-[#E8C99A] flex items-center justify-center text-[#0B2545] font-bold text-2xl ring-4 ring-white/10">
            {initials}
          </div>
          {/* Subtle decorative ring */}
          <div className="absolute -inset-1 rounded-full border border-white/10 pointer-events-none" />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight leading-snug">
            {basicInfo?.name || "Unknown Student"}
          </h1>

          <p className="text-white/60 mt-1 text-sm font-medium">
            {basicInfo?.major || "Major not provided"}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="flex items-center gap-1.5 bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium">
              {/* Building icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              {basicInfo?.university || "University not provided"}
            </span>

            <span className="flex items-center gap-1.5 bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Class of {basicInfo?.graduationYear || "N/A"}
            </span>

            <span className="bg-[#3ECFA3] text-[#0B2545] px-3 py-1 rounded-full text-xs font-bold">
              GPA {basicInfo?.gpa || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Download CV */}
      {basicInfo?.cvUrl && (
        <a
          href={basicInfo.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 bg-white text-[#0B2545] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-150"
        >
          <Download size={15} strokeWidth={2.5} />
          Download CV
        </a>
      )}
    </div>
  );
}