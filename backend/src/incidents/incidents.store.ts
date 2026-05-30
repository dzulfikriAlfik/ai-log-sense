export interface IncidentRecord {
  id: string;
  query: string;
  retrievedLogs: string[];
  analysis: string;
  createdAt: string;
}

export const incidents: IncidentRecord[] = [];