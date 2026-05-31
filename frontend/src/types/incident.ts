export interface AnalyzeIncidentRequest {
  query: string;
}

export interface SimilarIncidentResult {
  text: string;
  distance?: number;
}

export interface AnalyzeIncidentResponse {
  query: string;
  retrievedLogs: string[];
  analysis: string;
  similarIncidents: SimilarIncidentResult[];
}