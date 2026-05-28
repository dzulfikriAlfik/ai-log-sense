import { Injectable } from '@nestjs/common';

import { OllamaService } from '../ollama/ollama.service';
import { VectorService } from 'src/vector/vector.service';

@Injectable()
export class LogsService {
  constructor(
    private readonly ollamaService: OllamaService,
    private readonly vectorService: VectorService,
  ) {}

  async addLog(text: string) {
    const embeddingResponse = await this.ollamaService.generateEmbedding(text);

    const embedding = embeddingResponse.embedding;

    const id = crypto.randomUUID();

    await this.vectorService.addLogEmbedding(id, text, embedding);

    return {
      id,
      text
    };
  }

  async searchLogs(query: string) {
    const embeddingResponse = await this.ollamaService.generateEmbedding(query);

    const embedding = embeddingResponse.embedding;

    return this.vectorService.searchSimilarLogs(embedding);
  }
}
