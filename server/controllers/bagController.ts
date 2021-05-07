import { Router, Request, Response } from 'express'
import { IBag } from '../models/Bag'
import { CreateBagInput, UpdateBagInput } from '../InputOutputModels/BagModels'
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
    /**
     * Create Bag Route
     * @param req Request body must contain a name and can also contain a list of disc ids
     */
    this.router.post('/create', async (req: Request, res: Response) => {
      const { name, discs }: CreateBagInput = req.body

      try {
        const bag: IBag | string = await this.repository.createBag(name, discs)
        return typeof bag === 'string'
          ? res.status(400).send(bag)
          : res.status(201).json({ bag })
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    /**
     * Get All Bags Route
     */
    this.router.get('/getAllBags', async (req: Request, res: Response) => {
      try {
        const bags: Array<IBag> | null = await this.repository.getAllBags()
        return !bags ? res.status(404).send('No bags found') : res.status(200).json(bags)
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    /**
     * Get Bag by Id Route
     * @param req Request params must contain a valid Id for a bag
     */
    this.router.get('/getBagById/:id', async (req: Request, res: Response) => {
      const id: string = req.params.id

      try {
        const bag: IBag | null = await this.repository.getBagById(id)
        return !bag
          ? res.status(404).send('Bag of that Id not found')
          : res.status(200).json(bag)
      } catch (err) {
        res.send(400).send(err.message)
      }
    })

    /**
     * Delete Bag Route
     * @param req Request params must contain a valid Id for a bag
     */
    this.router.delete('/delete/:id', async (req: Request, res: Response) => {
      try {
        const id: string = req.params.id
        const result: boolean = await this.repository.deleteBag(id)

        return result ? res.sendStatus(204) : res.status(404).send('Bag Not Found')
      } catch (err) {
        res.send(400).send(err.message)
      }
    })

    /**
     * Update Bag Route
     * @param req Request body can contain a name and can also contain a list of
     *   disc ids to replace the existing ones with
     */
    this.router.put('/update/:id', async (req: Request, res: Response) => {
      try {
        const id: string = req.params.id
        const updates: UpdateBagInput = req.body

        const bag: IBag | null = await this.repository.updateBag(id, updates)
        return bag ? res.status(200).json(bag) : res.status(404).send('Bag Not Found')
      } catch (err) {
        res.send(400).send(err.message)
      }
    })

    /**
     * Create Bag Route
     * @param req Request body must contain a list of disc ids to add to the bag
     */
    this.router.put('/addDiscs/:id', async (req: Request, res: Response) => {
      try {
        const id: string = req.params.id
        const discs: Array<string> = req.body.discs

        const bag: IBag | null = await this.repository.addDiscs(id, discs)
        return bag ? res.status(200).json(bag) : res.status(404).send('Bag Not Found')
      } catch (err) {
        res.send(400).send(err.message)
      }
    })
  }
}

export default BagController
