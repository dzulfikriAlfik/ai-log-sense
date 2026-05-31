import { Module } from '@nestjs/common';
import { OpenaiModule } from 'src/openai/openai.module';
import { OllamaModule } from 'src/ollama/ollama.module';
import { VectorModule } from 'src/vector/vector.module';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';

@Module({
  imports: [OpenaiModule, OllamaModule, VectorModule],
  providers: [IncidentsService],
  exports: [IncidentsService],
  controllers: [IncidentsController]
})
export class IncidentsModule {}
