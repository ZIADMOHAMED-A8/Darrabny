export default function AchievementsSection() {
  return (
    <section className="rounded-2xl border border-[#cdd9f2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-[#111f37]">Achievements</h2>

      <div className="flex flex-wrap justify-center gap-12 sm:justify-between">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex min-w-[90px] justify-center">
            <div className="h-24 w-24 rounded-full bg-[radial-gradient(circle_at_50%_35%,#ffd34d_0%,#b37b13_45%,#1f1f1f_75%)] shadow-[0_8px_18px_rgba(15,23,42,0.2)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
