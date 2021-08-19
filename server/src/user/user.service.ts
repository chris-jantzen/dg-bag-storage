import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupInput, UpdateUserInput, UserLoginInput } from './user.dto';
import { User, UserDocument, UserModel } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  public async signup(userInfo: SignupInput): Promise<UserDocument> {
    const { user } = userInfo;
    const newUser: UserDocument = await this.userModel.create(user);
    return newUser;
  }

  public async login(userInfo: UserLoginInput): Promise<UserDocument | null> {
    const user: UserDocument = await this.userModel.login(
      userInfo.username,
      userInfo.password,
    );
    return user;
  }

  public async getAll(): Promise<UserDocument[]> {
    const users: UserDocument[] = await this.userModel.find({});
    return users;
  }

  public async getUser(id: string): Promise<UserDocument> {
    const user: UserDocument = await this.userModel.findById(id);
    return user;
  }

  public async updateUser(
    id: string,
    userInput: UpdateUserInput,
  ): Promise<UserDocument | null> {
    console.log(userInput);
    const user: UserDocument | null = await this.userModel.findByIdAndUpdate(
      id,
      userInput.user,
      { new: true },
    );
    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
    return;
  }
}
