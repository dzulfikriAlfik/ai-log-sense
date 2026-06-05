import { DASHBOARD_COPY } from "../config/ui.config";
import type { AnalyzeIncidentResponse } from "../types/incident";
import { isAnalyzeIncidentSuccessResponse } from "../types/incident";

interface AnalysisPanelProps {
  data: AnalyzeIncidentResponse | null;
}

export default function AnalysisPanel({ data }: AnalysisPanelProps) {
  if (!data) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="mb-2 text-xl font-semibold">
          {DASHBOARD_COPY.analysis.emptyTitle}
        </h2>
        <p className="text-sm text-zinc-400">
          {DASHBOARD_COPY.analysis.emptyDescription}
        </p>
      </section>
    );
  }

  if (!isAnalyzeIncidentSuccessResponse(data)) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="mb-2 text-xl font-semibold">
          {DASHBOARD_COPY.analysis.noResultTitle}
        </h2>
        <p className="text-sm text-zinc-400">{data.message}</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="mb-3 text-xl font-semibold">
        {DASHBOARD_COPY.analysis.title}
      </h2>

      <p className="whitespace-pre-wrap text-zinc-300">{data.analysis}</p>

      <h3 className="mt-6 font-semibold">
        {DASHBOARD_COPY.analysis.retrievedLogsTitle}
      </h3>

      <ul className="mt-2 space-y-2">
        {data.retrievedLogs.map((log) => (
          <li key={log} className="rounded bg-zinc-950 p-2 text-sm">
            {log}
          </li>
        ))}
      </ul>

      <h3 className="mt-6 font-semibold">
        {DASHBOARD_COPY.analysis.similarIncidentsTitle}
      </h3>

      {data.similarIncidents.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {data.similarIncidents.map((incident) => (
            <li key={incident} className="rounded bg-zinc-950 p-2 text-sm">
              {incident}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-zinc-400">
          {DASHBOARD_COPY.analysis.noSimilarIncidents}
        </p>
      )}
    </section>
  );
}