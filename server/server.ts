import express from 'express'
import { router as healthcheckRouter } from './routes/healthcheckRoutes'

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
  }

  private dbConnect() {
    console.log('connect to db')
  }

  private routerConfig() {
    this.app.use(healthcheckRouter)
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
