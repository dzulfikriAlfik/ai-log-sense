const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default () => ({
  port: toNumber(process.env.PORT, 3010),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  vectorSearchLimit: toNumber(process.env.VECTOR_SEARCH_LIMIT, 3),
  vectorDistanceThreshold: toNumber(process.env.VECTOR_DISTANCE_THRESHOLD, 500),
  embeddingModel: process.env.EMBEDDING_MODEL ?? 'nomic-embed-text',
  openaiModel: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
  openaiTemperature: toNumber(process.env.OPENAI_TEMPERATURE, 0.2),
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
  chromaDbBaseUrl: process.env.CHROMA_DB_BASE_URL ?? 'http://localhost:8000',
  openaiApiKey: process.env.OPENAI_API_KEY,
});
