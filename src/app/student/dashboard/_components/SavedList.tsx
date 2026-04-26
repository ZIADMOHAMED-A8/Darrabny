type Props = {
  title: string;
  company: string;
};

export default function SavedList({ title, company }: Props) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
        🔖
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{company}</p>
      </div>
    </div>
  );
}
