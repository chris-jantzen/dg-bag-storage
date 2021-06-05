import { User, IUser } from '../models/User'
import { CreateUserInput, UpdateUserInput } from '../InputOutputModels/UserModels'

class UserRepository {
  public async createUser(info: CreateUserInput): Promise<IUser> {
    const user: IUser = await User.create(info)
    return user
  }

  public async getAllUsers(): Promise<Array<IUser>> {
    const users: Array<IUser> = await User.find({})
    return users
  }

  public async getUser(id: string): Promise<IUser | null> {
    const user: IUser | null = await User.findById(id)
    return user
  }

  public async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id)
    return
  }

  public async updateUser(id: string, updates: UpdateUserInput): Promise<IUser | null> {
    const user: IUser | null = await User.findByIdAndUpdate(id, updates, { new: true })
    return user
  }

  // TODO: Change Password API?

  }
}

export default UserRepository
