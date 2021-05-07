import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import startDb from './dbConfig'
import HealthCheckController from './controllers/healthcheckController'
import BagController from './controllers/bagController'


class Server {
  private app

  constructor() {
    this.app = express()
    this.config()
    this.routerConfig()
    this.dbConnect()
  }

  private config() {
    this.app.use(express.json({ limit: '1mb' }))
    this.app.use(
      cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1'],
        credentials: true,
        exposedHeaders: ['set-cookie'],
      })
    )
    this.app.use(cookieParser())
  }

  private dbConnect() {
    startDb()
      .then((msg: string) => console.log(msg))
      .catch((err: string) => console.error(err))
  }

  private routerConfig() {
    this.app.use(new HealthCheckController().Router)
    this.app.use('/bag', new BagController().Router)
  }

  public start(port: number): Promise<number | Error> {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port)
        })
        .on('error', (err: Error) => reject(err))
    })
  }
}

export default Server
