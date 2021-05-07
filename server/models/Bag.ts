import { Schema, model } from 'mongoose'

const bagSchema = new Schema(
  {
    // ...
  },
  {
    collection: 'bag',
    timestamps: true,
  }
)

export const Bag = model('bag', bagSchema)

// TODO: Cassandra???
