import { Bind, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  private sickData: any;
  constructor(private readonly appService: AppService) {}

  @Get('/seller')
  getSeller() {
    return this.appService.getSeller();
  }
  @Get('/goods')
  getGoods() {
    return this.appService.getGoods();
  }
  @Get('/ratings')
  getRatings() {
    return this.appService.getRatings();
  }

  @Get('/getSickData')
  getSickData() {
    return this.appService.getSickData();
  }

  @Get('/getSickRankList')
  getSickRankList() {
    return this.appService.getSickRankList();
  }
}
