import { Bind, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':api')
  @Bind(Param('api'))
  getSeller(api) {
    return this.appService[`${api}`]();
  }
  // @Get(':getGoods')
  // getGoods() {
  //   return this.appService.getGoods();
  // }
  // @Get(':getRatings')
  // getRatings() {
  //   return this.appService.getRatings();
  // }
}
