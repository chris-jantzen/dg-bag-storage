import { Disc, IDisc } from '../models/Disc'
import { CreateDiscInput } from '../InputOutputModels/DiscModels'

class DiscRepository {
  public async createDisc(input: CreateDiscInput): Promise<IDisc | null> {
    const disc: IDisc | null = await Disc.create(input)
    return disc
  }

  public async getAllDiscs(): Promise<Array<IDisc>> {
    const discs: Array<IDisc> = await Disc.find({})
    return discs
  }

  public async getDiscById(id: string): Promise<IDisc | null> {
    const disc: IDisc | null = await Disc.findById(id)
    return disc
  }
}

export default DiscRepository
