import { useEffect, useState } from "react";

import AnalysisPanel from "../components/AnalysisPanel";
import MetricCard from "../components/MetricCard";
import SearchForm from "../components/SearchForm";
import { DASHBOARD_COPY } from "../config/ui.config";
import { analyzeIncident, getMetrics } from "../services/api";

import type { AnalyzeIncidentResponse } from "../types/incident";
import type { Metrics } from "../types/metrics";

function formatLatestIncidentAt(value: string | null): string {
  if (!value) {
    return DASHBOARD_COPY.metricValues.notAvailable;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [metricsError, setMetricsError] = useState<string | null>(null);
  const [isMetricsLoading, setIsMetricsLoading] = useState(true);

  const [analysis, setAnalysis] = useState<AnalyzeIncidentResponse | null>(
    null,
  );
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadMetrics() {
      try {
        const data = await getMetrics();

        if (isMounted) {
          setMetrics(data);
          setMetricsError(null);
        }
      } catch (error) {
        if (isMounted) {
          setMetricsError(
            error instanceof Error
              ? error.message
              : DASHBOARD_COPY.metricLoadError,
          );
        }
      } finally {
        if (isMounted) {
          setIsMetricsLoading(false);
        }
      }
    }

    void loadMetrics();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleAnalyze(query: string): Promise<void> {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysis(null);

    try {
      const result = await analyzeIncident({ query });
      setAnalysis(result);
    } catch (error) {
      setAnalysisError(
        error instanceof Error
          ? error.message
          : DASHBOARD_COPY.analysisLoadError,
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  if (isMetricsLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 p-8 text-white">
        {DASHBOARD_COPY.loadingMetrics}
      </div>
    );
  }

  if (metricsError) {
    return (
      <div className="min-h-screen bg-zinc-950 p-8 text-white">
        <p className="rounded-xl border border-red-900 bg-red-950 p-4 text-red-200">
          {metricsError}
        </p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-zinc-950 p-8 text-white">
        <p className="rounded-xl border border-red-900 bg-red-950 p-4 text-red-200">
          {DASHBOARD_COPY.metricLoadError}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold">{DASHBOARD_COPY.title}</h1>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title={DASHBOARD_COPY.metrics.totalLogs}
          value={metrics.totalLogs}
        />

        <MetricCard
          title={DASHBOARD_COPY.metrics.totalIncidents}
          value={metrics.totalIncidents}
        />

        <MetricCard
          title={DASHBOARD_COPY.metrics.latestIncident}
          value={formatLatestIncidentAt(metrics.latestIncidentAt)}
        />
      </section>

      {analysisError ? (
        <section className="mt-8 rounded-xl border border-red-900 bg-red-950 p-4 text-red-200">
          {analysisError}
        </section>
      ) : null}

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <SearchForm isSubmitting={isAnalyzing} onSearch={handleAnalyze} />
        <AnalysisPanel data={analysis} />
      </section>
    </main>
  );
}