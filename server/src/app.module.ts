import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { UserController } from './user/user.controller';
import { DiscController } from './disc/disc.controller';

import { BagModule } from './bag/bag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : '.development.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      retryAttempts: Number.MAX_VALUE,
    }),
    BagModule,
  ],
  controllers: [
    AppController,
    HealthcheckController,
    UserController,
    DiscController,
  ],
  providers: [AppService],
})
export class AppModule {}
