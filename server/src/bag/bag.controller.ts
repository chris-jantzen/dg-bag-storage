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
  async create(@Body() createBagInput: Bag): Promise<BagDocument> {
    const bag = await this.bagService.create(createBagInput);
    return bag;
  }

  @Get('get')
  async getAll(): Promise<BagDocument[]> {
    const bags = await this.bagService.getAll();
    return bags;
  }

  @Get('get/:id')
  async get(@Param() params): Promise<BagDocument> {
    const id: string = params.id;
    const bag: BagDocument = await this.bagService.get(id);
    return bag;
  }

  @Put('update/:id')
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

  @Put('addDiscs/:id')
  async addDiscs(
    @Param() params,
    @Body() body: { discs: string[] },
  ): Promise<BagDocument> {
    const id: string = params.id;
    const { discs } = body;
    const bag = await this.bagService.addDiscs(id, discs);
    if (!bag) {
      throw new HttpException('Bag Not Found', HttpStatus.NOT_FOUND);
    }
    return bag;
  }

  @Delete('delete/:id')
  @HttpCode(204)
  async delete(@Param() params): Promise<void> {
    const id: string = params.id;
    const deleted = await this.bagService.delete(id);
    if (!deleted) {
      throw new HttpException('Bag Not Found', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
