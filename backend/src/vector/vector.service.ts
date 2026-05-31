import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChromaClient } from 'chromadb';

@Injectable()
export class VectorService {
  private client: ChromaClient;

  constructor(private readonly configService: ConfigService) {
    const chromaBaseUrl = this.configService.get<string>('chromaDbBaseUrl');

    this.client = new ChromaClient({
      path: chromaBaseUrl,
    });
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
      nResults: 3,
      include: [
        'documents',
        'distances',
      ],
    });
  }
}
