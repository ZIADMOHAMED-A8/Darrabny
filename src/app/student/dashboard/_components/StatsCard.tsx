type Props = {
  label: string;
  value: string | number;
};

export default function StatsCard({ label, value }: Props) {
  return (
    <div className="rounded-xl bg-white/60 backdrop-blur p-4 shadow-sm flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
