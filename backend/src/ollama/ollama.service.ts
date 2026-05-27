import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class OllamaService {
  constructor(private readonly configService: ConfigService) {}

  async generateEmbedding(text: string) {
    const baseUrl = this.configService.get<string>('OLLAMA_BASE_URL');

    const response = await fetch(`${baseUrl}/api/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nomic-embed-text',
        prompt: text,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate embedding');
    }

    return response.json();
  }
}
