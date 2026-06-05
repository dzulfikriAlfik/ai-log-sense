export const INCIDENT_QUERY_CONFIG = {
  MIN_LENGTH: 3,
} as const;

export const DASHBOARD_COPY = {
  title: "LogSense",
  loadingMetrics: "Loading metrics...",
  metricLoadError: "Failed to load dashboard metrics.",
  analysisLoadError: "Failed to analyze incident.",
  metrics: {
    totalLogs: "Total Logs",
    totalIncidents: "Total Incidents",
    latestIncident: "Latest Incident",
  },
  metricValues: {
    notAvailable: "N/A",
  },
  search: {
    title: "Analyze Incident",
    placeholder: "Describe your incident...",
    buttonIdle: "Analyze Incident",
    buttonLoading: "Analyzing...",
    minLengthMessage: "Query must contain at least 3 characters.",
  },
  analysis: {
    emptyTitle: "No analysis yet",
    emptyDescription: "Submit an incident query to generate AI analysis.",
    title: "AI Analysis",
    noResultTitle: "No relevant logs found",
    retrievedLogsTitle: "Retrieved Logs",
    similarIncidentsTitle: "Similar Incidents",
    noSimilarIncidents: "No similar incidents found.",
  },
} as const;