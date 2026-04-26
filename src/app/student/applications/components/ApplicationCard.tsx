import ApplicationTimeline from "./ApplicationTimeline";

type Props = {
  title: string;
  company: string;
  steps: any[];
};

export default function ApplicationCard({ title, company, steps }: Props) {
  return (
    <div className="bg-white/60 backdrop-blur rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{company}</p>

      <ApplicationTimeline steps={steps} />
    </div>
  );
}
