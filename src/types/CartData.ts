import { Pet } from './Pet';

export interface CartData {
  items: Pet[];
  itemsTotal: number;
  priceTotal: number;
}
