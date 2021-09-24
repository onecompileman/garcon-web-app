import { Injectable } from '@angular/core';
import { OrderMenu } from 'src/app/shared/models/order-menu.model';
import { Order } from 'src/app/shared/models/order.model';
import { CompositeService } from './composite.service';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CartService extends CompositeService<OrderMenu> {
  addToCart(orderMenu: OrderMenu) {
    const propertyName = 'menu.id';

    const existingOrderMenuObj = this.getSingleByPropertyValue(
      propertyName,
      orderMenu.menu?.id
    );
    const existingOrderMenu = existingOrderMenuObj.value;

    if (existingOrderMenu) {
      orderMenu.quantity += existingOrderMenu.quantity;
      this.update(orderMenu, existingOrderMenuObj.index);
    } else {
      this.add(orderMenu);
    }
  }

  updateCart(orderMenu: OrderMenu) {
    const propertyName = 'menu.id';

    const existingOrderMenuObj = this.getSingleByPropertyValue(
      propertyName,
      orderMenu.menu?.id
    );

    if (orderMenu.quantity <= 0) {
      this.delete(existingOrderMenuObj.index);
    } else {
      this.update(orderMenu, existingOrderMenuObj.index);
    }
  }

  submitCartAsOrderAndRefresh(): Order {
    const orderMenus = cloneDeep(this.getAll());
    const dateSubmitted = new Date();

    this.clearAll();

    return {
      orderMenus,
      dateSubmitted,
    };
  }
}
