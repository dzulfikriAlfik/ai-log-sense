import { Injectable } from '@nestjs/common';

import { OllamaService } from '../ollama/ollama.service';
import { VectorService } from 'src/vector/vector.service';
import { OpenaiService } from 'src/openai/openai.service';
import { IncidentsService } from 'src/incidents/incidents.service';
import { VECTOR_COLLECTIONS } from 'src/vector/vector.constants';
import { dummyLogs } from './logs.seed';
import { logs } from './logs.store';
import { dummyIncidentQueries } from 'src/incidents/incidents.seed';

@Injectable()
export class LogsService {
  constructor(
    private readonly ollamaService: OllamaService,
    private readonly vectorService: VectorService,
    private readonly openaiService: OpenaiService,
    private readonly incidentsService: IncidentsService,
  ) {}

  async addLog(text: string) {
    const embeddingResponse = await this.ollamaService.generateEmbedding(text);

    const embedding = embeddingResponse.embedding;

    const id = crypto.randomUUID();

    await this.vectorService.addLogEmbedding(VECTOR_COLLECTIONS.LOGS, id, text, embedding);

    logs.push({
      id,
      text,
    });

    return {
      id,
      text,
    };
  }

  private async retrieveRelevantLogs(query: string) {
    const embeddingResponse = await this.ollamaService.generateEmbedding(query);

    const embedding = embeddingResponse.embedding;

    return this.vectorService.searchSimilarLogs(VECTOR_COLLECTIONS.LOGS, embedding);
  }

  async searchLogs(query: string) {
    const results = await this.retrieveRelevantLogs(query);

    const documents = results.documents?.[0] || [];

    const distances = results.distances?.[0] || [];

    const formatted = documents
      .map((document, index) => ({
        text: document,
        distance: distances[index],
        similarity: (1 - (distances?.[index] ?? 0)).toFixed(4),
      }))
      .filter((item) => Math.abs(Number(item.distance)) < 500);

    if (!formatted.length) {
      return {
        query,
        message: 'No relevant logs found.',
        results: [],
      };
    }

    return {
      query,
      results: formatted,
    };
  }

  async analyzeIncident(query: string) {
    const searchResults = await this.retrieveRelevantLogs(query);

    const logs =
      searchResults.documents?.[0]?.filter(
        (document): document is string => document !== null,
      ) ?? [];

    if (!logs.length) {
      return {
        message: 'No relevant logs found.',
      };
    }

    const analysis =
      (await this.openaiService.generateIncidentAnalysis(query, logs)) ??
      'No analysis generated.';

    const similarIncidents = await this.incidentsService.findSemanticSimilar(query);

    console.log({similarIncidents})

    const incident = {
      id: crypto.randomUUID(),
      query,
      retrievedLogs: logs,
      analysis,
      createdAt: new Date().toISOString(),
    };

    await this.incidentsService.save(incident);

    return {
      query,
      retrievedLogs: logs,
      analysis,
      similarIncidents,
    };
  }

  async generateDummyLogs() {
    const inserted: { id: string; log: string }[] = [];

    for (const log of dummyLogs) {
      const embeddingResponse = await this.ollamaService.generateEmbedding(log);

      const embedding = embeddingResponse.embedding;

      const id = crypto.randomUUID();

      await this.vectorService.addLogEmbedding(
        VECTOR_COLLECTIONS.LOGS,
        id,
        log,
        embedding,
      );

      inserted.push({
        id,
        log,
      });

      logs.push({
        id,
        text: log,
      });
    }

    return {
      count: inserted.length,
      inserted,
    };
  }

  async generateDummyIncidents() {
    const inserted: { id: string; incident: string }[] = [];

    for (const incident of dummyIncidentQueries) {
      await this.analyzeIncident(incident);

      inserted.push({id: crypto.randomUUID(), incident});
    }

    return inserted;
  }
}
