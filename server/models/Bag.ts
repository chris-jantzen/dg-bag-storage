import { Schema, model, Document } from 'mongoose'

const bagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discs: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    collection: 'bag',
    timestamps: true,
  }
)

export interface IBag extends Document {
  name: string
  discs?: Array<string>
}

export const Bag = model<IBag>('bag', bagSchema)
