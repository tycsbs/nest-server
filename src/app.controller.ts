import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getSeller();
  }
  @Get()
  getGoods() {
    return this.appService.getGoods();
  }
  @Get()
  getRatings() {
    return this.appService.getRatings();
  }
}
