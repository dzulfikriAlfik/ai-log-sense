import { Body, Controller, Post } from '@nestjs/common';

import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('add')
  async addLog(@Body() body: { text: string }) {
    return this.logsService.addLog(body.text);
  }

  @Post('search')
  async search(@Body() body: { query: string }) {
    if (!body.query || body.query.trim().length < 3) {
      return {
        message: 'Query must contain at least 3 characters.',
      };
    }

    return this.logsService.searchLogs(body.query);
  }

  @Post('analyze')
  async analyze(@Body() body: { query: string }) {
    return this.logsService.analyzeIncident(body.query);
  }
}
