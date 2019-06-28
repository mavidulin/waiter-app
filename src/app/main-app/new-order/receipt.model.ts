import {Waiter} from '../../core/models/waiter.model';
import {OrganisationAccount} from '../../core/models/organisation-account.model';
import {Bar} from '../../core/models/bar.model';

export class ReceiptItem {
  constructor(
    public name: string,
    public price: number,
    public qty: number
  ) {}
}

export class Receipt {
  organisation: OrganisationAccount;
  bar: Bar;
  waiter: Waiter;
  table: string;
  date: Date;
  items: ReceiptItem[];
  total: number;
}
