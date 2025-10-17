"use client"

const STEPS = [
  {
    icon: "👤",
    title: "Create Your Profile",
    desc: "Showcase your skills and experience to stand out.",
  },
  {
    icon: "🔍",
    title: "Explore Internships",
    desc: "Browse thousands of opportunities from top companies.",
  },
  {
    icon: "🖱️",
    title: "Apply with Ease",
    desc: "Apply to internships that match your interests with one click.",
  },
  {
    icon: "✨",
    title: "Get Matched",
    desc: "Our smart algorithm helps companies find you.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-background text-center">
      {/* Section Title */}
      <h2 className="text-3xl font-bold mb-12 text-foreground">How It Works</h2>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {STEPS.map((s) => (
          <div key={s.title} className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/15 text-primary text-3xl mb-4">
              {s.icon}
            </div>
            <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground max-w-[240px] mt-1">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
