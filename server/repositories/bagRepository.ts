import Bag from '../models/Bag'

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

  public async getAllBags(): Promise<any> /* Promise<[{ name: string, discs?: [string]}] | string */ {
    try {
      const bagDocuments = await Bag.find({})
      // const bags = bagDocuments.map((bag): [{ name: string, discs?: [string]}] => ({
      //   name: bag['name'],
      //   discs: bag['discs'],
      // }))

      return bagDocuments
    } catch (err) {
      console.log(err.message)
      return err.message
    }
  }
}

export default BagRepository
