import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { OllamaModule } from 'src/ollama/ollama.module';
import { VectorModule } from 'src/vector/vector.module';
import { OpenaiModule } from 'src/openai/openai.module';
import { IncidentsModule } from 'src/incidents/incidents.module';

@Module({
  imports: [
    OllamaModule,
    VectorModule,
    OpenaiModule,
    IncidentsModule
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
