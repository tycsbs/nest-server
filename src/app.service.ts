import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { getSeller, getGoods, getRatings } from './mock';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  getSeller() {
    return getSeller();
  }
  getGoods() {
    return getGoods();
  }
  getRatings() {
    return getRatings();
  }
  async getSickData(): Promise<any> {
    const baseURL =
      'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/';
    const url = 'list?modules=statisGradeCityDetail,diseaseh5Shelf';
    const data = await firstValueFrom(
      this.httpService.post(`${baseURL}${url}`)
    );
    return data.data;
  }
}
