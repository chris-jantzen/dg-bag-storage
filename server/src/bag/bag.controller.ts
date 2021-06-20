import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { BagService } from './bag.service';
// import { CreateBagDto } from './bag.dto';
import { Bag } from './bag.schema';

@Controller('bag')
export class BagController {
  constructor(private bagService: BagService) {}

  @Post('create')
  @HttpCode(201)
  @HttpCode(400)
  async create(@Body() createBagInput: Bag) {
    const bag = await this.bagService.create(createBagInput);
    return bag;
  }

  @Get('get')
  @HttpCode(200)
  @HttpCode(500)
  getAll() {
    return ['Bags', 'Of', 'Discs'];
  }

  @Get('get/:id')
  @HttpCode(200)
  @HttpCode(500)
  get(@Param() params): string {
    console.log(params.id);
    return params.id;
  }

  @Delete('delete/:id')
  @HttpCode(204)
  @HttpCode(404)
  @HttpCode(400)
  delete(@Param() params): void {
    const id: string = params.id;
    console.log(id);
  }
}
