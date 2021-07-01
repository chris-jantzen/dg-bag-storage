import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DiscService } from './disc.service';
import { Disc, DiscDocument } from './disc.schema';
import { UpdateDiscInput } from './disc.dto';

@Controller('disc')
export class DiscController {
  constructor(private discService: DiscService) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body() createDiscInput: Disc): Promise<DiscDocument> {
    const disc = await this.discService.create(createDiscInput);
    return disc;
  }

  @Get('get')
  async getAll(): Promise<DiscDocument[]> {
    const discs = await this.discService.getAll();
    return discs;
  }

  @Get('get/:id')
  async get(@Param() params): Promise<DiscDocument> {
    const id: string = params.id;
    const disc: DiscDocument = await this.discService.get(id);
    return disc;
  }

  @Put('update/:id')
  async update(
    @Param() params,
    @Body() updateDiscInput: UpdateDiscInput,
  ): Promise<DiscDocument> {
    const id: string = params.id;
    const updatedDisc: DiscDocument = await this.discService.update(
      id,
      updateDiscInput,
    );
    return updatedDisc;
  }

  @Delete('delete/:id')
  @HttpCode(204)
  async delete(@Param() params): Promise<void> {
    const id: string = params.id;
    const deleted = await this.discService.delete(id);
    if (!deleted) {
      throw new HttpException('Disc Not Found', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
