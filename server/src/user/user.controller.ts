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
import { User, UserDocument } from './user.schema';
import { sign } from 'jsonwebtoken';
import {
  DeleteUserInput,
  GetUserInput,
  UpdateUserInput,
  UpdateUserParams,
  UserLoginInput,
} from './user.dto';

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
  public async signup(@Body() user: User, @Res() res): Promise<UserDocument> {
    const newUser = await this.userService.signup(user);
    if (newUser) {
      const token = this.createToken(newUser._id);
      res.cookie('jwt', token, {
        /* httpOnly: true, */ maxAge: this.maxAge * 1000,
      });
      return res.status(201).json({ user: newUser, success: true });
    }
    throw new HttpException(
      'Error creating user',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post('login')
  public async login(@Body() userInput: UserLoginInput, @Res() res) {
    const user: UserDocument | null = await this.userService.login(userInput);
    if (user) {
      const token = this.createToken(user._id);
      res.cookie('jwt', token, {
        /* httpOnly: true, */ maxAge: this.maxAge * 1000,
      });
      return res.status(200).json({ user, success: true });
    } else {
      return res.status(404).send('User Not Found');
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
  public async getUser(@Param() params: GetUserInput): Promise<UserDocument> {
    const { id } = params;
    const user: UserDocument = await this.userService.getUser(id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @Put('update/:id')
  public async updateUser(
    @Param() params: UpdateUserParams,
    @Body() userInput: UpdateUserInput,
  ): Promise<UserDocument> {
    const { id } = params;
    const user: UserDocument | null = await this.userService.updateUser(
      id,
      userInput,
    );
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @Delete('delete/:id')
  @HttpCode(204)
  public async delete(@Param() params: DeleteUserInput): Promise<void> {
    await this.userService.delete(params.id);
  }
}
