import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'disc', timestamps: true })
export class User {
  @Prop({
    required: [true, 'A username is required'],
    unique: [true, 'Username must be unique'],
    type: String,
  })
  username: string;

  @Prop({
    required: [true, 'A password is required'],
    minlength: [4, 'Minimum password length is 4 characters'],
    type: String,
  })
  password: string;

  @Prop({ required: false, unique: true, lowercase: true, type: String })
  email?: string;

  @Prop({ required: false, type: String })
  bags?: number;

  @Prop({ required: false, type: String })
  discs?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
