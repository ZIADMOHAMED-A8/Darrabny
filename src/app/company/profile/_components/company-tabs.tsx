export default function CompanyTabs() {
  // Tabs (static)

  const tabs = ["About", "Jobs", "Reviews", "Training"];

  return (
    <div className="bg-[var(--ic-surface)] text-[var(--ic-ink)]">
      <div className="flex flex-wrap gap-16">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={[
              "relative pb-3 text-base font-medium text-slate-900 transition",
              i === 0 ? "text-[#155DFC]" : "hover:text-slate-700",
            ].join(" ")}
          >
            <span className="inline-block relative">
              {t}

              {/* Active underline */}
              {i === 0 && (
                <span className="absolute left-0 -bottom-1 h-[1px] w-full bg-[#1A99FE]" />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
