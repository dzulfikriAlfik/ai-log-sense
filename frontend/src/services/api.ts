import type { Metrics } from "../types/metrics";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMetrics(): Promise<Metrics> {
  const response = await fetch(`${API_BASE_URL}/metrics`);

  return response.json() as Promise<Metrics>;
}

export async function getIncidents() {
  const response = await fetch(`${API_BASE_URL}/incidents`);

  return response.json();
}

export async function analyzeIncident(query: string) {
  const response = await fetch(`${API_BASE_URL}/logs/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  return response.json();
}
