import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user/user.controller';

import { BagModule } from './bag/bag.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { DiscModule } from './disc/disc.module';

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
    HealthcheckModule,
    DiscModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
