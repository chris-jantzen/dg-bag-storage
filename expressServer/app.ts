import Server from './server'
import { config } from 'dotenv'

config({ path: `${__dirname}/.env` })
const PORT: number = parseInt(process.env.PORT || '5000')

new Server()
  .start(PORT)
  .then((port) => console.log(`Listening on port ${port}`))
  .catch((err: Error) => console.log(err))
