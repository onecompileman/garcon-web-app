import { OrderMenu } from './order-menu.model';

export interface Order {
  orderMenus?: OrderMenu[];
  dateSubmitted?: Date;
}
