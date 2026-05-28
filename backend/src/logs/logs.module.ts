import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { OllamaModule } from 'src/ollama/ollama.module';
import { VectorModule } from 'src/vector/vector.module';

@Module({
  imports: [
    OllamaModule,
    VectorModule
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
