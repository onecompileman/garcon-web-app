import { MenuClassification } from '../enums/menu-classification.enum';

export interface Menu {
  id: number;
  name: string;
  price: number;
  preparationTime: number;
  cookingTime: number;
  classification: MenuClassification;
  isChefRecommendation: boolean;
  pictureUrl: string;
}
