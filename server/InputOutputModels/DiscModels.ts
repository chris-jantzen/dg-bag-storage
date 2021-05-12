export interface CreateDiscInput {
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

export interface UpdateDiscInput {
  name?: string
  manufacturer?: string
  plastic?: string
  weight?: number
  bag?: string
  speed?: number
  glide?: number
  turn?: number
  fade?: number
  color?: number
  notes?: string
}
