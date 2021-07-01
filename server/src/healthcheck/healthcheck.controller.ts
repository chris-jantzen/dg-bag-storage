import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  @HttpCode(200)
  healthcheck(): string {
    return 'Success';
  }
}
