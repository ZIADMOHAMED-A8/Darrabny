type Props = {
  label: string;
  value: string | number;
};

export default function StatsCard({ label, value }: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white/60 p-4 shadow-sm backdrop-blur sm:flex-row sm:justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
