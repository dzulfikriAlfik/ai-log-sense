import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';

@Module({
  providers: [IncidentsService],
  exports: [IncidentsService],
  controllers: [IncidentsController]
})
export class IncidentsModule {}
