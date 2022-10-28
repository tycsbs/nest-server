import { Bind, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':api')
  @Bind(Param('api'))
  getSeller(api: string) {
    if (api === 'seller') {
      return this.appService.getSeller();
    } else if (api === 'goods') {
      return this.appService.getGoods();
    } else {
      return this.appService.getRatings();
    }
  }
}
