import { Disc, IDisc } from '../models/Disc'
import { CreateDiscInput, UpdateDiscInput } from '../InputOutputModels/DiscModels'

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

  public async deleteDisc(id: string): Promise<void> {
    await Disc.findByIdAndDelete(id)
  }

  public async updateDisc(id: string, input: UpdateDiscInput): Promise<IDisc | null> {
    const disc: IDisc | null = await Disc.findByIdAndUpdate(id, input, { new: true })
    return disc
  }
}

export default DiscRepository
