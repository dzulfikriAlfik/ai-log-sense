import { Body, Controller, Post } from '@nestjs/common';

import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('embedding')
  async embedding(@Body() body: { text: string }) {
    return this.logsService.testEmbedding(body.text);
  }
}
