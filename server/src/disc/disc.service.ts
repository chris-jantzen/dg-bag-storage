import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Disc, DiscDocument } from './disc.schema';
import { UpdateDiscInput } from './disc.dto';
import { BagService } from 'src/bag/bag.service';

@Injectable()
export class DiscService {
  constructor(
    @InjectModel(Disc.name) private discModel: Model<DiscDocument>,
    private bagService: BagService,
  ) {}

  public async create(disc: Disc): Promise<DiscDocument> {
    const newDisc: DiscDocument = await this.discModel.create(disc);
    if (disc.bag) {
      try {
        await this.bagService.addDiscs(disc.bag, [newDisc._id]);
      } catch (err) {
        await this.delete(newDisc._id);
        console.log(err.message);
      }
    }
    return newDisc;
  }

  public async getAll(): Promise<DiscDocument[]> {
    const discs = await this.discModel.find({});
    return discs;
  }

  public async get(id: string): Promise<DiscDocument | null> {
    const disc: DiscDocument | null = await this.discModel.findById(id);
    return disc;
  }

  public async update(
    id: string,
    updates: UpdateDiscInput,
  ): Promise<DiscDocument> {
    const updatedDisc: DiscDocument = await this.discModel.findByIdAndUpdate(
      id,
      updates,
      { new: true },
    );
    return updatedDisc;
  }

  public async delete(id: string): Promise<boolean> {
    const disc: DiscDocument | null = await this.discModel.findByIdAndDelete(
      id,
    );
    return !!disc;
  }
}
