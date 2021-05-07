import { Bag, IBag } from '../models/Bag'

class BagRepository {
  /**
   * Create a new bag
   * @param {string} name Name of the bag
   * @param {Array<string>} discs List of disc IDs to add to the bag
   * @returns {IBag} The bag
   */
  public async createBag(name: string, discs?: Array<string>): Promise<IBag> {
    const bag = await Bag.create({
      name,
      discs,
    })
    return bag
  }

  /**
   * Get all bags
   * TODO: By User ID
   * @returns {Array<IBag> | null} Any bags found or null
   */
  public async getAllBags(): Promise<Array<IBag> | null> {
    const bags: Array<IBag> | null = await Bag.find()
    return bags
  }

  /**
   * Get a bag by an Id
   * @param {string} id
   * @returns {IBag | null} The bag or a message stating the bag was not found
   */
  public async getBagById(id: string): Promise<IBag | null> {
    const bag: IBag | null = await Bag.findById(id)
    return bag
  }

  /**
   * Delete a bag
   * @param {string} id
   * @returns {boolean} True if the bag was deleted, false if bag is not found
   */
  public async deleteBag(id: string): Promise<boolean> {
    const bag: IBag | null = await Bag.findByIdAndDelete(id)
    return !bag ? false : true
  }
}

export default BagRepository
