export interface CreateUserInput {
  username: string
  password: string
  email: string
  discs?: [string]
  bags?: [string]
}

export interface UpdateUserInput {
  username?: string
  password?: string
  email?: string
  discs?: [string]
  bags?: [string]
}
