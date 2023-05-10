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

  getMongoTrendData() {
    this.getTrendData()
      .then(() => {
        console.log('接口访问成功');
      })
      .catch((err) => {
        console.log(err.message);
      });
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

  getTrendData(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url =
        'https://vipact.api.mgtv.com/api/v1/act/vote/charlist?ticket=9A1D1848A6093515A36A9240BEBEF814&act_name=20230414cf2023&count=50&invoker=mobile-zhifubao&_dx_seq_id=75550b80-b1f6-8af7-119a-35b4ae44f3e5&v=v4';
      this.httpService.get(url).subscribe((res) => {
        const { data } = res.data;
        resolve(data);
      });
    });
  }

  async getTrendData2() {
    const url =
      'https://vipact.api.mgtv.com/api/v1/act/vote/charlist?ticket=9A1D1848A6093515A36A9240BEBEF814&act_name=20230414cf2023&count=50&invoker=mobile-zhifubao&_dx_seq_id=75550b80-b1f6-8af7-119a-35b4ae44f3e5&v=v4';
    const {
      data: { errno, ret, character_list }
    } = await firstValueFrom(this.httpService.get(url));
    if (ret === ERROR_OK) {
      return {
        status: 0,
        data: character_list
      };
    } else {
      return {
        status: errno,
        data: '',
        message: '内部错误!'
      };
    }
  }
}
