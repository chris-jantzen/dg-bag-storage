export interface UserLoginInput {
  username: string;
  password: string;
}

export interface GetUserInput {
  id: string;
}

export interface UpdateUserParams {
  id: string;
}

export interface UpdateUserInput {
  username?: string;
  password?: string;
  email?: string;
  bags?: number;
  discs?: string;
}

export interface DeleteUserInput {
  id: string;
}
