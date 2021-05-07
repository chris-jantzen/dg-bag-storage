import { Schema, model } from 'mongoose'

const discSchema = new Schema(
  {
    discName: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: false,
    },
    plastic: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    bags: {
      type: [String],
      required: false,
    },
    speed: {
      type: Number,
      required: true,
    },
    glide: {
      type: Number,
      required: true,
    },
    true: {
      type: Number,
      required: true,
    },
    fade: {
      type: Number,
      required: true,
    },
    color: {
      type: String, // Hex?
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'disc',
    timestamps: true,
  }
)

export default model('disc', discSchema)
