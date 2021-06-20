import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BagController } from './bag.controller';
import { Bag, BagSchema } from './bag.schema';
import { BagService } from './bag.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bag.name, schema: BagSchema }])],
  controllers: [BagController],
  providers: [BagService],
})
export class BagModule {}
