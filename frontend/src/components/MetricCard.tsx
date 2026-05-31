interface MetricCardProps {
  title: string;
  value: string | number;
}

export default function MetricCard({ title, value }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className="mt-2 text-3xl font-semibold">{value}</h2>
    </div>
  );
}
