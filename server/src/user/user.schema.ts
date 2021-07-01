import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

export type UserDocument = User & Document;

export interface UserModel extends Model<UserDocument> {
  login: (username, password) => UserDocument;
}

@Schema({ collection: 'user', timestamps: true })
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

UserSchema.pre<UserDocument>('save', async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error(`Username ${username} is not registered`);
};
