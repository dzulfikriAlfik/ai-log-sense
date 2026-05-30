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
}
