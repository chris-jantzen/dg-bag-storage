import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import {
  DeleteUserInput,
  GetUserInput,
  GetUserOutput,
  SignupInput,
  UpdateUserInput,
  UpdateUserOutput,
  UpdateUserParams,
  UserLoginInput,
} from './user.dto';
import { throwError } from '../utils';

@Controller('user')
export class UserController {
  private maxAge = 60 * 60 * 24;

  constructor(private userService: UserService) {}

  private createToken(userId: string) {
    return sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: this.maxAge,
    });
  }

  @Post('signup')
  @HttpCode(201)
  public async signup(
    @Body() user: SignupInput,
    @Res() res: Response,
  ): Promise<void> {
    const newUser = await this.userService.signup(user);
    if (newUser) {
      const token = this.createToken(newUser._id);
      res.cookie('jwt', token, {
        /* httpOnly: true, */
        maxAge: this.maxAge * 1000,
      });
      res.status(201).json({ user: newUser, success: true });
      return;
    }
    return throwError('Error Creating User', HttpStatus.BAD_REQUEST);
  }

  @Post('login')
  public async login(
    @Body() userInput: UserLoginInput,
    @Res() res,
  ): Promise<void> {
    try {
      const user: UserDocument | null = await this.userService.login(userInput);
      if (user) {
        const token = this.createToken(user._id);
        res.cookie('jwt', token, {
          /* httpOnly: true, */
          maxAge: this.maxAge * 1000,
        });
        res.status(200).json({ user, success: true });
        return;
      } else {
        return throwError('User Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      return throwError(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get')
  public async getAll(): Promise<UserDocument[]> {
    const users = await this.userService.getAll();
    if (users) {
      return users;
    }
    throw new HttpException('No Users', HttpStatus.NOT_FOUND);
  }

  @Get('get/:id')
  public async getUser(@Param() params: GetUserInput): Promise<GetUserOutput> {
    const { id } = params;
    const user: UserDocument = await this.userService.getUser(id);
    if (user) {
      return { user, success: true };
    }
    throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
  }

  @Put('update/:id')
  public async updateUser(
    @Param() params: UpdateUserParams,
    @Body() userInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    const { id } = params;
    const user: UserDocument | null = await this.userService.updateUser(
      id,
      userInput,
    );
    if (user) {
      return { user, success: true };
    }
    throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete('delete/:id')
  @HttpCode(204)
  public async delete(@Param() params: DeleteUserInput): Promise<void> {
    try {
      await this.userService.delete(params.id);
    } catch (err) {
      return throwError(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
