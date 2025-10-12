import FeatureItem from "./FeatureItem";
import {  Brain, BookOpenCheck, RectangleEllipsis } from "lucide-react";

export default function FeatureList() {
  return (
    <div className="flex flex-col gap-9">
      <h2 className="text-4xl font-heading font-semibold">
        Empower your learning journey <br/> with our smart exam platform.
      </h2>

      <FeatureItem
        icon={Brain} // أيقونة رقم 1
        title="Tailored Diplomas"
        description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
      />

      <FeatureItem
        icon={BookOpenCheck} // أيقونة رقم 2
        title="Focused Exams"
        description="Access topic-specific tests including HTML, CSS, JavaScript, and more."
      />

      <FeatureItem
        icon={RectangleEllipsis} // أيقونة رقم 3
        title="Smart Multi-Step Forms"
        description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
      />
    </div>
  );
}
