import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscController } from './disc.controller';
import { DiscService } from './disc.service';
import { Disc, DiscSchema } from './disc.schema';
import { BagModule } from 'src/bag/bag.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Disc.name, schema: DiscSchema }]),
    BagModule,
  ],
  controllers: [DiscController],
  providers: [DiscService],
})
export class DiscModule {}
