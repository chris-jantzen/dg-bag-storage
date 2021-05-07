import Server from './server'
import { config } from 'dotenv'

config({ path: './.env' })

const PORT: number = process.env.PORT || 5000

new Server()
  .start(PORT)
  .then((port) => console.log(`Listening on port ${port}`))
  .catch((err: Error) => console.log(err))
