import { useEffect, useState } from "react";
import { getIncidents } from "../services/api";
import type { Incident } from "../types/incident";

interface MemoryItem {
  id: string;
  query: string;
  analysis: string;
  createdAt: string;
}

export default function OperationalMemoryDashboard() {
  const [memory, setMemory] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadMemory() {
      try {
        const data = await getIncidents() as Incident[];
        if (!isMounted) return;

        const sorted = data
          .map((inc) => ({
            id: inc.id,
            query: inc.query,
            analysis: inc.analysis,
            createdAt: inc.createdAt,
          }))
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ); // newest first

        setMemory(sorted);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load operational memory");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    void loadMemory();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="p-4 text-white">Loading operational memory...</div>;

  if (error) {
    return (
      <div className="p-4 text-red-400 rounded bg-red-950 border border-red-900">
        {error}
      </div>
    );
  }
    
  if (memory.length === 0) {
    return <div className="p-4 text-zinc-400">No operational memory available.</div>;
  }

  return (
    <div className="p-4 rounded border border-zinc-800 bg-zinc-900">
      <h2 className="mb-4 text-xl font-semibold text-white">Operational Memory</h2>
      <ul className="space-y-4">
        {memory.map((item) => (
          <li key={item.id} className="flex flex-col space-y-1 border-b border-zinc-800 pb-2">
            <span className="text-zinc-400 text-sm">
              {new Date(item.createdAt).toLocaleString()}
            </span>
            <span className="text-white font-medium">{item.query}</span>
            <span className="text-zinc-300 text-sm">{item.analysis}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}