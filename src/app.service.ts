import { Injectable } from '@nestjs/common';
import { getSeller, getGoods, getRatings } from './mock';

@Injectable()
export class AppService {
  getSeller() {
    return getSeller();
  }
  getGoods() {
    return getGoods();
  }
  getRatings() {
    return getRatings();
  }
}
