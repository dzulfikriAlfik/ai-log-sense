import { Injectable } from '@nestjs/common';
import { IncidentRecord, incidents } from './incidents.store';

@Injectable()
export class IncidentsService {
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
}
