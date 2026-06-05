function getRequiredEnvValue(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const API_CONFIG = {
  BASE_URL: getRequiredEnvValue(
    import.meta.env.VITE_API_BASE_URL,
    "VITE_API_BASE_URL",
  ),
} as const;

export const API_ENDPOINTS = {
  METRICS: "/metrics",
  ANALYZE_INCIDENT: "/logs/analyze",
  INCIDENTS: "/incidents",
} as const;

export const API_HEADERS = {
  JSON: {
    "Content-Type": "application/json",
  },
} as const;