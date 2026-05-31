import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import envConfig from './config/env.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsModule } from './logs/logs.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    LogsModule,
    MetricsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
