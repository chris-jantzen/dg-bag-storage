import { Bag, IBag } from '../models/Bag'

class BagRepository {
  public async createBag(name: string, discs?: [string]): Promise<void> {
    try {
      await Bag.create({
        name,
        discs,
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  public async getAllBags(): Promise<Array<IBag> | string> {
    try {
      const bagDocuments: Array<IBag> = await Bag.find({})

      return bagDocuments
    } catch (err) {
      console.log(err.message)
      return err.message
    }
  }
}

export default BagRepository
