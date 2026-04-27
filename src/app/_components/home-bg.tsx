export default function HomeBg() {
  // Background blobs (from public)

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Base color wash (no image) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f8fbff 0%, #f3f7ff 45%, #eef4ff 100%)",
        }}
      />

      {/* Soft dotted pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(6,48,88,0.10) 1px, rgba(255,255,255,0) 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Large ambient blobs / waves */}
      <div
        className="absolute inset-0 opacity-[0.85]"
        style={{
          backgroundImage:
            "radial-gradient(900px 500px at 70% 45%, rgba(215,228,255,0.70) 0%, rgba(215,228,255,0) 60%), radial-gradient(900px 600px at 35% 75%, rgba(193,210,238,0.55) 0%, rgba(193,210,238,0) 62%), radial-gradient(1200px 700px at 50% 110%, rgba(215,228,255,0.55) 0%, rgba(215,228,255,0) 65%)",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  )
}
