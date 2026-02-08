import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { companyProfileDummy } from "../_data/company-profile.dummy"

export default function CompanyCover() {
  // Cover banner

  return (
    <div className="relative mt-6 overflow-hidden ">
      {/* Cover image */}
      <div className="relative h-[160px] md:h-[300px]">
        <Image
          src={companyProfileDummy.coverImage}
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Back button (UI only) */}
      <button className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur border border-white/10">
        <ArrowLeft className="h-5 w-5" />
      </button>
    </div>
  )
}
