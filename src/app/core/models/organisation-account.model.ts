import {ShortBar} from './bar.model';

export class OrganisationAccount {
  id: number;
  name: string;
  email: string;
  password: string;
  bars: ShortBar[];
}
