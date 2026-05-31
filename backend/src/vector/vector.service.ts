import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChromaClient } from 'chromadb';

@Injectable()
export class VectorService {
  private client: ChromaClient;
  private vectorSearchLimit: number;

  constructor(private readonly configService: ConfigService) {
    this.client = new ChromaClient({
      path: this.configService.get<string>('chromaDbBaseUrl'),
    });

    this.vectorSearchLimit = this.configService.get<number>('vectorSearchLimit') ?? 3;
  }

  async getCollection(collectionName: string) {
    return this.client.getOrCreateCollection({
      name: collectionName,
    });
  }

  async addLogEmbedding(
    collectionName: string,
    id: string,
    log: string,
    embedding: number[]
  ) {
    const collection = await this.getCollection(collectionName);

    await collection.add({
      ids: [id],
      documents: [log],
      embeddings: [embedding],
    });
  }

  async searchSimilarLogs(collectionName: string, embedding: number[]) {
    const collection = await this.getCollection(collectionName);

    return collection.query({
      queryEmbeddings: [embedding],
      nResults: this.vectorSearchLimit,
      include: [
        'documents',
        'distances',
      ],
    });
  }
}
