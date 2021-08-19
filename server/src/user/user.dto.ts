import { User, UserDocument } from './user.schema';

export interface SignupInput {
  user: User;
}

export interface UserLoginInput {
  username: string;
  password: string;
}

export interface GetUserInput {
  id: string;
}

export interface GetUserOutput {
  user: UserDocument;
  success: boolean;
}

export interface UpdateUserParams {
  id: string;
}

export interface UpdateUserInput {
  user: Partial<User>;
}

export interface UpdateUserOutput {
  user: UserDocument;
  success: boolean;
}

export interface DeleteUserInput {
  id: string;
}
