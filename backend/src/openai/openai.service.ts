import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateIncidentAnalysis(query: string, logs: string[]) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4.1-mini',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: `
            You are an expert DevOps and incident analysis AI assistant.

            Your task:
            - Analyze infrastructure logs
            - Identify probable root causes
            - Explain issues clearly
            - Suggest possible technical causes

            Keep answers concise and technical.
          `,
        },
        {
          role: 'user',
          content: `
            User query:
            ${query}

            Relevant logs:
            ${logs.join('\n')}

            Analyze the incident.
          `,
        },
      ],
    });

    return response.choices[0].message.content;
  }

  async generateIncidentSummary(incidents: string[]) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4.1-mini',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: 'Summarize operational incident patterns.',
        },
        {
          role: 'user',
          content: incidents.join('\n'),
        },
      ],
    });

    return response.choices[0].message.content;
  }
}
