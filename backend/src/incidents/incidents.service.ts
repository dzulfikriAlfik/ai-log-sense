import { Injectable } from '@nestjs/common';
import { IncidentRecord, incidents } from './incidents.store';
import { OpenaiService } from 'src/openai/openai.service';
import { OllamaService } from 'src/ollama/ollama.service';
import { VectorService } from 'src/vector/vector.service';
import { VECTOR_COLLECTIONS } from 'src/vector/vector.constants';

@Injectable()
export class IncidentsService {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly ollamaService: OllamaService,
    private readonly vectorService: VectorService,
  ) {}

  async save(incident: IncidentRecord) {
    incidents.push(incident);

    const embeddingResponse = await this.ollamaService.generateEmbedding(
      incident.query,
    );

    await this.vectorService.addLogEmbedding(
      VECTOR_COLLECTIONS.INCIDENTS,
      incident.id,
      incident.query,
      embeddingResponse.embedding,
    );
  }

  findAll() {
    return incidents;
  }

  async findSemanticSimilar(query: string) {
    const embeddingResponse = await this.ollamaService.generateEmbedding(query);

    const results = await this.vectorService.searchSimilarLogs(
      VECTOR_COLLECTIONS.INCIDENTS,
      embeddingResponse.embedding,
    );

    return (
      results.documents?.[0]?.filter(
        (document): document is string => document !== null,
      ) ?? []
    );
  }

  getTimeline() {
    return [...incidents].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async generateSummary() {
    const queries = incidents.map((incident) => incident.query);
    const summary = await this.openaiService.generateIncidentSummary(queries);

    return {
      totalIncidents: incidents.length,
      summary,
    };
  }
}
