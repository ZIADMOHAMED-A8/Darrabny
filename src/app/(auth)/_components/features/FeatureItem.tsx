import { LucideIcon } from "lucide-react";

type FeatureItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-4 items-start">
      {/* أيقونة جوّه دائرة bordered */}
      <div className="flex items-center justify-center p-3 border border-blue-600">
        <Icon size={24} className="text-[#155DFC]" />
      </div>

      <div>
        <h3 className="text-lg text-[#155DFC] font-sans font-semibold">{title}</h3>
        <p className="Gray/gray-700 text-base font-sans leading-snug max-w-2xs">{description}</p>
      </div>
    </div>
  );
}
