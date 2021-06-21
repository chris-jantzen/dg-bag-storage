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
    return !!bag
  }

  /**
   * Update a bag
   * @param {string} id Id of the bag
   * @param updates Name or disc list
   * @returns {IBag | null} Bag if the update is successful or null if bag is not found
   */
  public async updateBag(
    id: string,
    updates: { name?: string; discs?: Array<string> }
  ): Promise<IBag | null> {
    const updatedBag: IBag | null = await Bag.findByIdAndUpdate(id, updates, {
      new: true,
    })
    return updatedBag
  }

  /**
   * Add discs to a bag
   * @param id Id of the bag
   * @param {Array<string>} discs List of disc Ids
   * @returns {IBag | null} Returns the bag or null if bag not found
   */
  public async addDiscs(id: string, discs: Array<string>): Promise<IBag | null> {
    const updatedBag: IBag | null = await Bag.findByIdAndUpdate(
      id,
      {
        $push: { discs: { $each: discs } },
      },
      { new: true }
    )
    return updatedBag
  }
}

export default BagRepository
