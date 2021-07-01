import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BagDocument = Bag & Document;

@Schema({ collection: 'bag', timestamps: true })
export class Bag {
  @Prop({ required: true, type: String, unique: true })
  name: string;

  @Prop({ required: false, type: [String], default: [] })
  discs?: Array<string>;
}

export const BagSchema = SchemaFactory.createForClass(Bag);
