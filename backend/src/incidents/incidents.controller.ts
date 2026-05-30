import { Controller, Get } from '@nestjs/common';
import { IncidentsService } from './incidents.service';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get()
  findAll() {
    return this.incidentsService.findAll();
  }

  @Get('timeline')
  getTimeline() {
    return this.incidentsService.getTimeline();
  }

  @Get('summary')
  async getSummary() {
    return this.incidentsService.generateSummary();
  }
}
