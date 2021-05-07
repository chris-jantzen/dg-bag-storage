import { Schema, model } from 'mongoose'

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

export default model('bag', bagSchema)
