import { useEffect, useState } from "react";

import MetricCard from "../components/MetricCard";

import { getMetrics } from "../services/api";
import type { Metrics } from "../types/metrics";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  async function loadMetrics() {
    const data = await getMetrics();

    setMetrics(data);
  }

  if (!metrics) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="mb-8 text-4xl font-bold">LogSense</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Total Logs" value={metrics.totalLogs} />

        <MetricCard title="Total Incidents" value={metrics.totalIncidents} />

        <MetricCard
          title="Latest Incident"
          value={metrics.latestIncidentAt ? "Available" : "N/A"}
        />
      </div>
    </div>
  );
}
