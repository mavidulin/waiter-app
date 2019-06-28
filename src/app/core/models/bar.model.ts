import {Waiter} from './waiter.model';
import {PriceListSection} from './price-list.model';

export class ShortBar {
  id: number;
  name: string;
  address: string;
}

export class Bar extends ShortBar {
  waiters: Waiter[];
  priceList: PriceListSection[];
  tables: string[];
}
