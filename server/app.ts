import Server from './server'

const PORT = 5000

// const server = new Server()
// server.start(PORT)

const starter = new Server()
  .start(PORT)
  .then((port) => console.log(`Listening on port ${port}`))
  .catch((err: Error) => {
    console.log(err)
  })

export default starter
