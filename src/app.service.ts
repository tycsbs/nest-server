import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { getSeller, getGoods, getRatings } from './mock';

type SickDataMo = {
  ret: number;
  data: any;
};

const ERROR_OK = 0;
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
    const url =
      'list?modules=statisGradeCityDetail,diseaseh5Shelf,chinaDayList,chinaDayAddList,cityStatis,provinceCompare';
    const {
      data: { data, ret }
    } = (await firstValueFrom(
      this.httpService.post(`${baseURL}${url}`)
    )) as unknown as SickDataMo;
    if (+ret === ERROR_OK) {
      return {
        status: 0,
        data: data
      };
    } else {
      return {
        status: 500,
        data: '',
        message: '内部错误!'
      };
    }
  }
  async getSickRankList(): Promise<any> {
    const url =
      'https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist';
    const {
      data: { data, ret }
    } = (await firstValueFrom(
      this.httpService.post(url)
    )) as unknown as SickDataMo;
    if (+ret === ERROR_OK) {
      return {
        status: 0,
        data: data
      };
    } else {
      return {
        status: 500,
        data: '',
        message: '内部错误!'
      };
    }
  }
}
