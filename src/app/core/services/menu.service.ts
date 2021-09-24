import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuClassification } from 'src/app/shared/enums/menu-classification.enum';
import { Menu } from 'src/app/shared/models/menu.model';
import { CompositeService } from './composite.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends CompositeService<Menu> {
  async loadMenuItem(): Promise<void> {
    const res = await fetch('/assets/data/menu.json');
    const menuItems = await res.json();

    this.items$.next(menuItems);
  }
  // Todo: add guards or catch to filter null parameters or add breaker "?"
  //Todo: Use property name capturing like Keyof
  getAllByClassification(classification: MenuClassification): Menu[] {
    const propertyName = 'classification';

    return this.getAllByPropertyValue(propertyName, classification);
  }

  getAllChefRecommendation(): Menu[] {
    const propertyName = 'isChefRecommendation';

    return this.getAllByPropertyValue(propertyName, 1);
  }

  getById(id: number): Menu {
    const propertyName = 'id';

    return this.getSingleByPropertyValue(propertyName, id).value;
  }
}
