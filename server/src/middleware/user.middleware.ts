import { Injectable, NestMiddleware } from '@nestjs/common';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Require Auth Middleware');
    const token = req.cookies.jwt;
    const secretKey = process.env.SECRET_KEY;

    if (token) {
      jwt.verify(token, secretKey, (err: VerifyErrors | null): void => {
        if (err) {
          // redirect to login
          res.redirect('/login');
          return;
        } else {
          next();
        }
      });
    } else {
      // redirect to login
      res.redirect('/login');
    }
    next();
  }
}
