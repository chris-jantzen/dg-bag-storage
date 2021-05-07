import { Schema, model, Document } from 'mongoose'
import { compare, genSalt, hash } from 'bcrypt'

export interface IUser extends Document {
  username: string
  password: string
  email?: string
  bags?: Array<string>
  discs?: Array<string>
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'A username is required'],
    },
    password: {
      type: String,
      required: [true, 'A password is required'],
      minlength: [4, 'Minimum password length is 4 characters'],
    },
    email: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
    },
    bags: {
      type: [String],
      required: false,
      default: [],
    },
    discs: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    collection: 'user',
    timestamps: true,
  }
)

userSchema.pre<IUser>('save', async function (next) {
  const salt = await genSalt()
  this.password = await hash(this.password, salt)
  next()
})

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username })
  if (user) {
    const auth = await compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Incorrect password')
  }
  throw Error(`Username ${username} is not registered`)
}

export const User = model<IUser>('User', userSchema)
