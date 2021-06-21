import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  Delete,
  Param,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BagService } from './bag.service';
import { Bag, BagDocument } from './bag.schema';
import { UpdateBagInput } from './bag.dto';

@Controller('bag')
export class BagController {
  constructor(private bagService: BagService) {}

  @Post('create')
  @HttpCode(201)
  @HttpCode(400)
  async create(@Body() createBagInput: Bag): Promise<BagDocument> {
    const bag = await this.bagService.create(createBagInput);
    return bag;
  }

  @Get('get')
  @HttpCode(200)
  async getAll(): Promise<BagDocument[]> {
    const bags = await this.bagService.getAll();
    return bags;
  }

  @Get('get/:id')
  @HttpCode(200)
  @HttpCode(404)
  async get(@Param() params): Promise<BagDocument> {
    const id: string = params.id;
    const bag: BagDocument = await this.bagService.get(id);
    return bag;
  }

  @Put('update/:id')
  @HttpCode(200)
  @HttpCode(400)
  @HttpCode(404)
  async update(
    @Param() params,
    @Body() updateBagInput: UpdateBagInput,
  ): Promise<BagDocument> {
    const id: string = params.id;
    const updatedBag: BagDocument = await this.bagService.update(
      id,
      updateBagInput,
    );
    return updatedBag;
  }

  @Delete('delete/:id')
  @HttpCode(204)
  @HttpCode(404)
  async delete(@Param() params): Promise<void> {
    const id: string = params.id;
    const deleted = await this.bagService.delete(id);
    if (!deleted) {
      throw new HttpException('Bag Not Found', HttpStatus.NOT_FOUND);
    }
    return;
  }

  // @Put('addDiscs/:id')
}
