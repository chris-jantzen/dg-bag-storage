import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BagModule } from './bag/bag.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { DiscModule } from './disc/disc.module';
import { UserModule } from './user/user.module';

import { UserMiddleware } from './middleware/user.middleware';
import { DiscController } from './disc/disc.controller';
import { BagController } from './bag/bag.controller';

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(DiscController, BagController);
  }
}
