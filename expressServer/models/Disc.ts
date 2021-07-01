import { Schema, model, Document } from 'mongoose'

export interface IDisc extends Document {
  name: string
  manufacturer?: string
  plastic?: string
  weight?: number
  bag?: string
  speed: number
  glide: number
  turn: number
  fade: number
  color: number
  notes?: string
}

const discSchema = new Schema(
  {
    name: {
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
    bag: {
      type: String,
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
    turn: {
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
      default: '#ffffff',
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

export const Disc = model<IDisc>('disc', discSchema)
