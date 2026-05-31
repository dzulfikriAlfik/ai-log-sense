import { Injectable } from '@nestjs/common';

import { logs } from '../logs/logs.store';
import { incidents } from '../incidents/incidents.store';

@Injectable()
export class MetricsService {
  getMetrics() {
    const latestIncident = incidents.length > 0 ? incidents[incidents.length - 1] : null;

    return {
      totalLogs: logs.length,
      totalIncidents: incidents.length,
      latestIncidentAt: latestIncident?.createdAt ?? null,
    };
  }
}
