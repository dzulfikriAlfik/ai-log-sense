import { Module } from '@nestjs/common';
import { OpenaiModule } from 'src/openai/openai.module';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';

@Module({
  imports: [OpenaiModule],
  providers: [IncidentsService],
  exports: [IncidentsService],
  controllers: [IncidentsController]
})
export class IncidentsModule {}
