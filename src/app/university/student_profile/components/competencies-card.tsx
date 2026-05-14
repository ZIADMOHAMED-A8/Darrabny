export default function CompetenciesCard({ skills }: any) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-bold text-base text-slate-800 mb-5 flex items-center gap-2">
          {/* Lightning bolt icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Core Competencies
        </h2>
  
        <div className="flex flex-wrap gap-2">
          {skills?.length > 0 ? (
            skills.map((skill: string) => (
              <span
                key={skill}
                className="bg-[#E8F4FD] text-[#1A6FA8] px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#C5DFF0] select-none"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-slate-400 text-sm">No competencies provided.</p>
          )}
        </div>
      </div>
    );
  }