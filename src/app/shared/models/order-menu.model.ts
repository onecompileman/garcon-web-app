import { Menu } from './menu.model';

export interface OrderMenu {
  menu?: Menu | any;
  quantity: number;

  remainingPrepTimeInSeconds?: number;
  prepTimeCompletion?: number;
  remainingCookingTimeInSeconds?: number;
  cookingTimeCompletion?: number;

  // Todo: Cherry pick important properties from Menu, like ID
}
