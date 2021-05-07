import Server from './server'

const PORT = 5000

new Server()
  .start(PORT)
  .then((port) => console.log(`Listening on port ${port}`))
  .catch((err: Error) => console.log(err))
