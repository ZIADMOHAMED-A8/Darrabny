// app/company/report/_components/report-background.tsx
import Image from "next/image";

export default function ReportBackground() {
  // Decorative background (static)

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Image
        src="/bg-report.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
