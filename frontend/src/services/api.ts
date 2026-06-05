import { API_CONFIG, API_ENDPOINTS, API_HEADERS } from "../config/api.config";

import type {
  AnalyzeIncidentRequest,
  AnalyzeIncidentResponse,
  Incident,
} from "../types/incident";
import type { Metrics } from "../types/metrics";

async function buildHttpErrorMessage(response: Response): Promise<string> {
  const responseText = await response.text();

  if (!responseText) {
    return `Request failed with status ${response.status}`;
  }

  return `Request failed with status ${response.status}: ${responseText}`;
}

async function requestJson<TResponse>(
  endpoint: string,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, init);

  if (!response.ok) {
    throw new Error(await buildHttpErrorMessage(response));
  }

  return (await response.json()) as TResponse;
}

export async function getMetrics(): Promise<Metrics> {
  return requestJson<Metrics>(API_ENDPOINTS.METRICS);
}

export async function getIncidents(): Promise<Incident[]> {
  return requestJson<Incident[]>(API_ENDPOINTS.INCIDENTS);
}

export async function analyzeIncident(
  payload: AnalyzeIncidentRequest,
): Promise<AnalyzeIncidentResponse> {
  return requestJson<AnalyzeIncidentResponse>(API_ENDPOINTS.ANALYZE_INCIDENT, {
    method: "POST",
    headers: API_HEADERS.JSON,
    body: JSON.stringify(payload),
  });
}