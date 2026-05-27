import { Injectable } from '@nestjs/common';

import { OllamaService } from '../ollama/ollama.service';

@Injectable()
export class LogsService {
  constructor(private readonly ollamaService: OllamaService) {}

  async testEmbedding(text: string) {
    return this.ollamaService.generateEmbedding(text);
  }
}
