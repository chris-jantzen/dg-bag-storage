import { Router, Request, Response } from 'express'
import { CreateUserInput, UpdateUserInput } from '../InputOutputModels/UserModels'
import { IUser } from '../models/User'
import UserRepository from '../repositories/userRepository'

class UserController {
  private router: Router

  private repository: UserRepository

  constructor() {
    this.router = Router()
    this.repository = new UserRepository()
  }

  private routes(): void {
    this.router.post('/create', async (req: Request, res: Response) => {
      try {
        const input: CreateUserInput = req.body
        const user: IUser = await this.repository.createUser(input)
        return user ? res.status(201).json(user) : res.status(400).json(user)
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    this.router.get('/getUsers', async (req: Request, res: Response) => {
      try {
        const users: Array<IUser> = await this.repository.getAllUsers()
        return users.length
          ? res.status(200).json(users)
          : res.status(404).send('No users')
      } catch (err) {
        res.status(500).send(err.message)
      }
    })

    this.router.get('/getUser/:id', async (req: Request, res: Response) => {
      try {
        const id: string = req.params.id
        const user: IUser | null = await this.repository.getUser(id)
        return user ? res.status(200).json(user) : res.status(404).send('User not found')
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    this.router.delete('/delete/:id', async (req: Request, res: Response) => {
      try {
        const id: string = req.params.id
        await this.repository.deleteUser(id)
        res.sendStatus(204)
      } catch (err) {
        res.status(404).send(err.message)
      }
    })

    this.router.put('/update/:id', async (req: Request, res: Response) => {
      try {
        const id: string = req.params.id
        const input: UpdateUserInput = req.body
        const updatedUser: IUser | null = await this.repository.updateUser(id, input)
        return updatedUser
          ? res.status(200).json(updatedUser)
          : res.status(404).send('User not found')
      } catch (err) {
        res.status(400).send(err.message)
      }
    })
  }
}

export default UserController
