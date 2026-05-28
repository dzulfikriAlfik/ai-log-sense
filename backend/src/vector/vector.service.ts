import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChromaClient } from 'chromadb';

@Injectable()
export class VectorService {
  private client: ChromaClient;

  constructor(private readonly configService: ConfigService) {
    const chromaBaseUrl = this.configService.get<string>('CHROMA_DB_BASE_URL');

    this.client = new ChromaClient({
      path: chromaBaseUrl,
    });
  }

  async getCollection() {
    return this.client.getOrCreateCollection({
      name: 'logsense_logs',
    });
  }

  async addLogEmbedding(id: string, log: string, embedding: number[]) {
    const collection = await this.getCollection();

    await collection.add({
      ids: [id],
      documents: [log],
      embeddings: [embedding],
    });
  }

  async searchSimilarLogs(embedding: number[]) {
    const collection = await this.getCollection();

    return collection.query({
      queryEmbeddings: [embedding],
      nResults: 3,
      include: [
        'documents',
        'distances',
      ],
    });
  }
}
