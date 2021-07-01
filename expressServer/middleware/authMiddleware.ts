import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'

/**
 * verification step for actions in other methods
 * checks if auth token is valid before action is completed
 */
const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.jwt
  const secretKey = process.env.SECRET_KEY || 'secret'

  if (token) {
    jwt.verify(token, secretKey, (err: VerifyErrors | null): void => {
      if (err) {
        res.redirect('/login')
      } else {
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

module.exports = {
  requireAuth,
}
