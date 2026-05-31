import type { AnalyzeIncidentResponse } from "../types/incident";

interface AnalysisPanelProps {
  data: AnalyzeIncidentResponse | null;
}

export default function AnalysisPanel({ data }: AnalysisPanelProps) {
  if (!data) {
    return null;
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="mb-3 text-xl font-semibold">AI Analysis</h2>

      <p className="text-zinc-300">{data.analysis}</p>

      <h3 className="mt-6 font-semibold">Retrieved Logs</h3>

      <ul className="mt-2 space-y-2">
        {data.retrievedLogs.map((log) => (
          <li key={log} className="rounded bg-zinc-950 p-2 text-sm">
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
}
