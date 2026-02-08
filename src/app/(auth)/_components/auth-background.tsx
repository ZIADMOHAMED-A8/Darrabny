import Image from "next/image";

export default function AuthBackground({
  src = "/auth-bg.png",
}: {
  src?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Image src={src} alt="" fill priority />
    </div>
  );
}
