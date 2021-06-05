import { Router, Request, Response } from 'express'
import { CreateUserInput, UpdateUserInput } from '../InputOutputModels/UserModels'
import { IUser } from '../models/User'
import UserRepository from '../repositories/userRepository'
import * as jwt from 'jsonwebtoken'

class UserController {
  private router: Router

  private repository: UserRepository

  private maxAge: number

  get Router(): Router {
    return this.router
  }

  constructor() {
    this.router = Router()
    this.repository = new UserRepository()
    this.maxAge = 60 * 60 * 24
    this.routes()
  }

  private routes(): void {
    this.router.post('/create', async (req: Request, res: Response) => {
      try {
        const input: CreateUserInput = req.body
        const user: IUser = await this.repository.createUser(input)
        if (user) {
          const token = this.createToken(user?._id)
          res.cookie('jwt', token, { /* httpOnly: true, */ maxAge: this.maxAge * 1000 })
          return res.status(201).json(user)
        }
        return  res.status(400).json(user)
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

  /**
   * creates authentication token
   */
  private createToken(id: string) {
    return jwt.sign(
      { id },
      // TODO: Hide in env vars
      'vSlkqh4X4EMtYW4iemp3zA09nKJ3SH3zQgnX1fOrkt1@8HCnLMfQIUHb8Z6O1%yQ7zggPIlEE*!*iYMaCbPdCgPxJ%*QYH5V97E',
      {
        expiresIn: this.maxAge,
      }
    )
  }
}

export default UserController
