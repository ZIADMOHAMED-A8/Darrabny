import Image from "next/image";

export default function HubBackground() {
  // Decorative background layer (static)

  return (
    <div className="pointer-events-none absolute inset-0  overflow-hidden">
      {/* Background image */}
      <Image
        src="/bg2.png"
        alt=""
        fill
        priority
        className="translate-y-80"
      />
    </div>
  );
}
