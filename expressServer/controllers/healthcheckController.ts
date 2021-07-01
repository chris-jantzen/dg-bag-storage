import { Router, Request, Response } from 'express'

// export const healthcheck = (_: Request, res: Response): void => {
//   res.status(200).send('Success')
// }

class HealthCheckController {
  private router: Router

  get Router(): Router {
    return this.router
  }

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes(): void {
    this.router.get('/healthcheck', (req: Request, res: Response) => {
      res.sendStatus(200)
    })
  }
}

export default HealthCheckController
