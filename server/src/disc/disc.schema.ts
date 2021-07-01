import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiscDocument = Disc & Document;

@Schema({ collection: 'disc', timestamps: true })
export class Disc {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: false, type: String })
  manufacturer?: string;

  @Prop({ required: false, type: String })
  plastic?: string;

  @Prop({ required: false, type: Number })
  weight?: number;

  @Prop({ required: false, type: String })
  bag?: string;

  @Prop({ required: true, type: Number })
  speed: number;

  @Prop({ required: true, type: Number })
  glide: number;

  @Prop({ required: true, type: Number })
  turn: number;

  @Prop({ required: true, type: Number })
  fade: number;

  @Prop({ required: true, default: '#ffffff', type: String })
  color: string;

  @Prop({ required: false, type: String })
  notes?: string;
}

export const DiscSchema = SchemaFactory.createForClass(Disc);
