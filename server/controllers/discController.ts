import { Router, Request, Response } from 'express'
import { CreateDiscInput, UpdateDiscInput } from '../InputOutputModels/DiscModels'
import { IDisc } from '../models/Disc'
import DiscRepository from '../repositories/discRepository'

class DiscController {
  private router: Router
  private repository: DiscRepository

  get Router(): Router {
    return this.router
  }

  constructor() {
    this.router = Router()
    this.repository = new DiscRepository()
    this.routes()
  }

  private routes(): void {
    this.router.post('/create', async (req: Request, res: Response) => {
      try {
        const input: CreateDiscInput = req.body
        const disc: IDisc | null = await this.repository.createDisc(input)
        return disc ? res.status(201).json(disc) : res.status(400).json(disc)
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    this.router.get('/get', async (_: Request, res: Response) => {
      try {
        const discs: Array<IDisc> = await this.repository.getAllDiscs()
        res.status(200).json(discs)
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    this.router.get('/get/:id', async (req: Request, res: Response) => {
      try {
        const id: string = req.params.id
        const disc: IDisc | null = await this.repository.getDiscById(id)
        return disc ? res.status(200).json(disc) : res.status(404).json('')
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    this.router.delete('/delete', async (req: Request, res: Response) => {
      try {
        const id: string = req.params.id
        await this.repository.deleteDisc(id)
        res.sendStatus(204)
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    this.router.put('/update/:id', async (req: Request, res: Response) => {
      try {
        const id: string = req.params.id
        const input: UpdateDiscInput = req.body
        const disc: IDisc | null = await this.repository.updateDisc(id, input)
        disc ? res.status(200).json(disc) : res.status(404).json(undefined)
      } catch (err) {
        res.status(400).send(err.message)
      }
    })
  }
}

export default DiscController
