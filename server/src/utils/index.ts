import { HttpException } from '@nestjs/common';

export const throwError = (message: string, code: number) => {
  throw new HttpException({ message, success: false }, code);
};
