import { useEffect, useState } from "react";
import { getIncidents } from "../services/api";
import type { Incident } from "../types/incident";

interface TimelineItem {
  id: string;
  query: string;
  createdAt: string;
}

export default function TimelineVisualization() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTimeline() {
      try {
        const data = await getIncidents() as Incident[];
        if (!isMounted) return;
        const sorted = data
          .map((inc) => ({
            id: inc.id,
            query: inc.query,
            createdAt: inc.createdAt,
          }))
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        setTimeline(sorted);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load timeline");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    void loadTimeline();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="p-4 text-white">Loading timeline...</div>;

  if (error) {
    return (
      <div className="p-4 text-red-400 rounded bg-red-950 border border-red-900">
        {error}
      </div>
    );
  }

  if (timeline.length === 0) {
    return <div className="p-4 text-zinc-400">No incidents in timeline.</div>;
  }

  return (
    <div className="p-4 rounded border border-zinc-800 bg-zinc-900">
      <h2 className="mb-4 text-xl font-semibold text-white">Incident Timeline</h2>
      <ul className="space-y-4">
        {timeline.map((item) => (
          <li key={item.id} className="flex space-x-4">
            <span className="w-40 text-zinc-400">{new Date(item.createdAt).toLocaleString()}</span>
            <span className="text-white">{item.query}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}