import Image from "next/image";

export default function WavesBackground({
  src = "/waves.png",
}: {
  src?: string;
}) {
  // Decorative waves background (static)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 overflow-hidden">
      {/* Waves image */}
      <div className="relative h-[240px] w-full">
        <Image
          src={src}
          alt=""
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>
    </div>
  );
}
