import { Router, Request, Response } from 'express'
import BagRepository from '../repositories/bagRepository'

class BagController {
  private router: Router
  private repository: BagRepository

  get Router(): Router {
    return this.router
  }

  constructor() {
    this.router = Router()
    this.repository = new BagRepository()
    this.routes()
  }

  public routes(): void {
    this.router.post('/create', async (req: Request, res: Response) => {
      const { name, discs }: { name: string; discs?: [string] } = req.body

      try {
        await this.repository.createBag(name, discs)
        res.status(200).send('Success Creating Bag')
      } catch (err) {
        res.status(400).send('Error Creating Bag')
      }
    })

    this.router.get('/getAllBags', async (req: Request, res: Response) => {
      try {
        await this.repository.getAllBags()
        res.status
      } catch (err) {
        console.error(err)
      }
    })
  }
}

export default BagController
