import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BagDocument, Bag } from './bag.schema';

@Injectable()
export class BagService {
  constructor(@InjectModel(Bag.name) private bagModel: Model<BagDocument>) {}

  async create(bag): Promise<BagDocument> {
    const newBag: BagDocument = await this.bagModel.create(bag);
    return newBag;
  }
}
