export class PriceListSection {
  category: string;
  items: PriceListItem[];
}

export class PriceListItem {
  name: string;
  price: number;

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
