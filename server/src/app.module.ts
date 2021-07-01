import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BagModule } from './bag/bag.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { DiscModule } from './disc/disc.module';
import { UserModule } from './user/user.module';

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
    UserModule,
  ],
})
export class AppModule {}
