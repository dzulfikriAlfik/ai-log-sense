import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { OllamaModule } from 'src/ollama/ollama.module';

@Module({
  imports: [OllamaModule],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
