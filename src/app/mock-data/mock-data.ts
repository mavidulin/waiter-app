import {OrganisationAccount} from '../core/models/organisation-account.model';
import {PriceListSection} from '../core/models/price-list.model';
import {Bar} from '../core/models/bar.model';

const priceList: PriceListSection[] = [
  {
    category: 'Warm drinks',
    items: [
      {name: 'Espresso', price: 1.00},
      {name: 'Coffe with milk (small)', price: 1.50},
      {name: 'Coffe with milk (large)', price: 2.00},
      {name: 'Coffe with cream', price: 2.00},
      {name: 'Tea', price: 2.00},
      {name: 'Hot chocolate', price: 3.00},
      {name: 'Nescafe', price: 2.50},
    ]
  },
  {
    category: 'Beverages',
    items: [
      {name: 'Coca-Cola', price: 3.00},
      {name: 'Sprite', price: 2.50},
      {name: 'Freshly squeezed juice', price: 4.00},
      {name: 'Fanta', price: 2.00}
    ]
  },
  {
    category: 'Beers',
    items: [
      {name: 'Budweiser', price: 3.00},
      {name: 'Weestmalle', price: 3.50},
      {name: 'Jupiler', price: 3.00},
      {name: 'Sintpalsken', price: 3.00},
      {name: 'Guiness', price: 4.00}
    ]
  },
  {
    category: 'Wines',
    items: [
      {name: 'Chardonnay 0.1', price: 3.00},
      {name: 'Cabernet Sauvignon 0.1', price: 3.50},
      {name: 'Pinot noir 0.1', price: 3.00},
      {name: 'Chardonnay 0.75', price: 22.00},
      {name: 'Cabernet Sauvignon 0.75', price: 24.00},
      {name: 'Pinot noir 0.75', price: 22.00}
    ]
  },
  {
    category: 'Extras',
    items: [
      {name: 'Honey', price: 1.00},
      {name: 'Cream', price: 2.00},
      {name: 'Soy milk', price: 1.00}
    ]
  }
];

export const BARS: Bar[] = [
  {
    id: 1,
    name: 'From Dusk Till Dawn',
    address: 'Dark Alley 1b',
    waiters: [{id: 1, name: 'John Doe', pin: '1111'}, {id: 2, name: 'Jane Doe', pin: '2222'}, {id: 3, name: 'Joe Foo', pin: '3333'}],
    priceList: priceList,
    tables: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Table 10']
  },
  {
    id: 2,
    name: 'Cold Beer Pub',
    address: 'Cold Street 5',
    waiters: [{id: 4, name: 'Jill', pin: '1111'}, {id: 5, name: 'Mark', pin: '2222'}, {id: 6, name: 'Greg', pin: '3333'}, {id: 7, name: 'Mitch', pin: '4444'}],
    priceList: priceList,
    tables: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', ]
  },
  {
    id: 3,
    name: 'Wine Bar',
    address: 'Wine Street 8',
    waiters: [{id: 8, name: 'Samantha', pin: '1111'}, {id: 9, name: 'John', pin: '2222'}],
    priceList: priceList,
    tables: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5']
  },
  {
    id: 4,
    name: 'Starbucks 1',
    address: 'Start Street 1',
    waiters: [{id: 1, name: 'Peter', pin: '1111'}, {id: 2, name: 'Nick', pin: '2222'}, {id: 3, name: 'Barbara', pin: '3333'}],
    priceList: priceList,
    tables: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Table 10']
  },
  {
    id: 5,
    name: 'Starbucks 2',
    address: 'Start Street 2',
    waiters: [{id: 4, name: 'Ryan', pin: '1111'}, {id: 5, name: 'Mark', pin: '2222'}],
    priceList: priceList,
    tables: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Table 10']
  },
  {
    id: 6,
    name: 'Starbucks 3',
    address: 'Start Street 3',
    waiters: [{id: 8, name: 'Samantha', pin: '1111'}, {id: 9, name: 'John', pin: '2222'}],
    priceList: priceList,
    tables: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Table 10']
  }
];

export const ORGANISATIONS: OrganisationAccount[] = [
  {
    id: 1,
    name: 'Cafe Org',
    email: 'cafeorg@cafeorg.com',
    password: '1234',
    bars: [
      {id: BARS[0].id, name: BARS[0].name, address: BARS[0].address},
      {id: BARS[1].id, name: BARS[1].name, address: BARS[1].address},
      {id: BARS[2].id, name: BARS[2].name, address: BARS[2].address}
    ]
  },
  {
    id: 1,
    name: 'Starbucks',
    email: 'starbucks@starbucks.com',
    password: '1234',
    bars: [
      {id: BARS[3].id, name: BARS[3].name, address: BARS[3].address},
      {id: BARS[4].id, name: BARS[4].name, address: BARS[4].address},
      {id: BARS[5].id, name: BARS[5].name, address: BARS[5].address}
    ]
  }
];
