import { Request, Response } from 'express'

export const healthcheck = (_: Request, res: Response): void => {
  res.status(200).send('Success')
}
