import { useEffect, useState } from "react";
import { getIncidents } from "../services/api";
import type { Incident } from "../types/incident";
import { DASHBOARD_COPY } from "../config/ui.config";

interface IncidentHistoryTableProps {}

export default function IncidentHistoryTable(
  _props: IncidentHistoryTableProps,
) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadIncidents() {
      try {
        const data = await getIncidents();
        if (isMounted) {
          setIncidents(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load incidents",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadIncidents();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-white">{DASHBOARD_COPY.loadingMetrics}</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400 rounded bg-red-950 border border-red-900">
        {error}
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="p-4 text-zinc-400 rounded bg-zinc-900 border border-zinc-800">
        No incidents found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded border border-zinc-800 bg-zinc-900 p-4">
      <table className="w-full table-auto text-left text-sm text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Incident ID</th>
            <th className="px-4 py-2">Query</th>
            <th className="px-4 py-2">Analysis</th>
            <th className="px-4 py-2">Retrieved Logs</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id} className="border-t border-zinc-800">
              <td className="px-4 py-2">{incident.id}</td>
              <td className="px-4 py-2">{incident.query}</td>
              <td className="px-4 py-2">
                {incident.analysis.length > 50
                  ? incident.analysis.slice(0, 50) + "..."
                  : incident.analysis}
              </td>
              <td className="px-4 py-2">{incident.retrievedLogs.length}</td>
              <td className="px-4 py-2">
                {new Date(incident.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}