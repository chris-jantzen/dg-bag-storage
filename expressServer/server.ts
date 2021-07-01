import express, { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import startDb from './dbConfig'
import HealthCheckController from './controllers/healthcheckController'
import BagController from './controllers/bagController'
import DiscController from './controllers/discController'
import UserController from './controllers/userController'

class Server {
  private app: Express

  constructor() {
    this.app = express()
    this.config()
    this.routerConfig()
    this.dbConnect()
  }

  private config() {
    this.app.use(express.json({ limit: '1mb' }))
    console.log(process.env.WHITE_LISTED_ORGINS)
    this.app.use(
      cors({
        origin: process.env.WHITE_LISTED_ORIGINS?.split(','),
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
    this.app.use('/disc', new DiscController().Router)
    this.app.use('/user', new UserController().Router)
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
