export interface AnalyzeIncidentRequest {
  query: string;
}

export interface AnalyzeIncidentSuccessResponse {
  query: string;
  retrievedLogs: string[];
  analysis: string;
  similarIncidents: string[];
}

export interface AnalyzeIncidentNoResultResponse {
  message: string;
}

export type AnalyzeIncidentResponse = AnalyzeIncidentSuccessResponse | AnalyzeIncidentNoResultResponse;

export interface Incident {
  id: string;
  query: string;
  retrievedLogs: string[];
  analysis: string;
  createdAt: string;
}

export function isAnalyzeIncidentSuccessResponse(response: AnalyzeIncidentResponse): response is AnalyzeIncidentSuccessResponse {
  return (
    "query" in response &&
    "retrievedLogs" in response &&
    "analysis" in response &&
    "similarIncidents" in response
  );
}