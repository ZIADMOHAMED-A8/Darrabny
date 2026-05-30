import ApplicationTimeline from "./ApplicationTimeline";

type Props = {
  title: string;
  company: string;
  steps: Array<{
    label: string;
    date: string;
    status: string;
  }>;
};

export default function ApplicationCard({ title, company, steps }: Props) {
  return (
    <div className="rounded-2xl bg-white/60 p-4 shadow-sm backdrop-blur sm:p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{company}</p>

      <ApplicationTimeline steps={steps} />
    </div>
  );
}
