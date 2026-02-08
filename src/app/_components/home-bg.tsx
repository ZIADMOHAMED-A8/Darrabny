import Image from "next/image"

export default function HomeBg() {
  // Background blobs (from public)

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Image
        src="/bg.png"
        alt=""
        fill
        priority
        className="object-cover opacity-90"
      />
    </div>
  )
}
