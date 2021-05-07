import { connect } from 'mongoose'

// const dbURI = 'mongodb://localhost:27017/dg-bag'
const dbURI: string = process.env.DB_URI || 'fake'

export default (): Promise<string> => {
  return new Promise((resolve, reject) => {
    connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
      .then(() => {
        resolve('Connected to db...')
      })
      .catch((err) => {
        console.error(err)
        reject(err.message)
      })
  })
}
