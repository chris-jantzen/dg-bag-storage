export interface CreateBagInput {
  name: string
  discs?: Array<string>
}

export interface UpdateBagInput {
  name?: string
  discs?: Array<string>
}
