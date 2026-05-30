import { Injectable } from '@nestjs/common';
import { IncidentRecord, incidents } from './incidents.store';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class IncidentsService {
  constructor(private readonly openaiService: OpenaiService) {}

  save(incident: IncidentRecord) {
    incidents.push(incident);
  }

  findAll() {
    return incidents;
  }

  findSimilar(query: string) {
    return incidents.filter(
      (incident) =>
        incident.query.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes(incident.query.toLowerCase()),
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
