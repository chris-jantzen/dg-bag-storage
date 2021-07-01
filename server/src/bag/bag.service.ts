import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBagInput } from './bag.dto';
import { BagDocument, Bag } from './bag.schema';

@Injectable()
export class BagService {
  constructor(@InjectModel(Bag.name) private bagModel: Model<BagDocument>) {}

  public async create(bag: Bag): Promise<BagDocument> {
    const newBag: BagDocument = await this.bagModel.create(bag);
    return newBag;
  }

  public async getAll(): Promise<BagDocument[]> {
    const bags: BagDocument[] = await this.bagModel.find();
    return bags;
  }

  public async get(id: string): Promise<BagDocument | null> {
    const bag: BagDocument | null = await this.bagModel.findById(id);
    return bag;
  }

  public async update(
    id: string,
    updates: UpdateBagInput,
  ): Promise<BagDocument> {
    const updatedBag: BagDocument = await this.bagModel.findByIdAndUpdate(
      id,
      updates,
      { new: true },
    );
    return updatedBag;
  }

  public async addDiscs(id: string, discs: string[]): Promise<BagDocument> {
    const updatedBag: BagDocument | null =
      await this.bagModel.findByIdAndUpdate(
        id,
        {
          $push: { discs: { $each: discs } },
        },
        { new: true },
      );
    return updatedBag;
  }

  public async delete(id: string): Promise<boolean> {
    const bag: BagDocument | null = await this.bagModel.findByIdAndDelete(id);
    return !!bag;
  }

  public async removeDiscs(
    bagId: string,
    discIds: string[],
  ): Promise<BagDocument> {
    console.log(bagId, discIds);
    const updatedBag: BagDocument | null =
      await this.bagModel.findByIdAndUpdate(
        bagId,
        {
          $pullAll: { discs: discIds },
        },
        { new: true },
      );
    return updatedBag;
  }
}
