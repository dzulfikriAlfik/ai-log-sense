import { Injectable } from '@nestjs/common';
import { ChromaClient } from 'chromadb';

@Injectable()
export class VectorService {
  private client: ChromaClient;

  constructor() {
    this.client = new ChromaClient({
      path: 'http://localhost:8000',
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
