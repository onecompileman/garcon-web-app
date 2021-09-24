import { Injectable } from '@angular/core';
import {
  addMinutes,
  addSeconds,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderMenu } from 'src/app/shared/models/order-menu.model';
import { Order } from 'src/app/shared/models/order.model';
import { CompositeService } from './composite.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends CompositeService<Order> {
  selectCanBillout(): Observable<boolean> {
    return this.selectAllOrdersDone().pipe(
      map(
        (ordersDone) =>
          ordersDone.length >= 1 && ordersDone.length === this.getLength()
      )
    );
  }

  //   Todo: add access modifier for all methods
  selectAllWithRemainingTime(): Observable<Order[]> {
    return this.selectAll().pipe(
      map((orders) => {
        return orders.map((order) => {
          const dateSubmitted = order.dateSubmitted;

          order.orderMenus = (<OrderMenu[]>order.orderMenus).map(
            (orderMenu) => {
              const expectedPrepDoneDate = addSeconds(
                <Date>dateSubmitted,
                orderMenu.menu.preparationTime * 60
              );
              const expectedCookingDoneDate = addSeconds(
                <Date>dateSubmitted,
                orderMenu.menu.cookingTime * 60
              );

              orderMenu.remainingPrepTimeInSeconds = differenceInSeconds(
                expectedPrepDoneDate,
                new Date()
              );
              orderMenu.prepTimeCompletion =
                ((orderMenu.menu.preparationTime * 60 -
                  orderMenu.remainingPrepTimeInSeconds) /
                  (orderMenu.menu.preparationTime * 60)) *
                100;
              orderMenu.prepTimeCompletion =
                orderMenu.prepTimeCompletion >= 100
                  ? 100
                  : orderMenu.prepTimeCompletion;

              if (orderMenu.prepTimeCompletion >= 100) {
                orderMenu.remainingCookingTimeInSeconds = differenceInSeconds(
                  expectedCookingDoneDate,
                  new Date()
                );

                orderMenu.cookingTimeCompletion =
                  ((orderMenu.menu.cookingTime * 60 -
                    orderMenu.remainingCookingTimeInSeconds) /
                    (orderMenu.menu.cookingTime * 60)) *
                  100;
                orderMenu.cookingTimeCompletion =
                  orderMenu.cookingTimeCompletion >= 100
                    ? 100
                    : orderMenu.cookingTimeCompletion;
              }
              return orderMenu;
            }
          );

          return order;
        });
      })
    );
  }

  //   Todo: for all functions add return types
  selectAllOrdersDone() {
    return this.selectAllWithRemainingTime().pipe(
      map((orders) =>
        orders.filter((order: Order) =>
          order.orderMenus.every(
            (orderMenu: OrderMenu) =>
              orderMenu.remainingPrepTimeInSeconds <= 0 &&
              orderMenu.remainingCookingTimeInSeconds <= 0
          )
        )
      )
    );
  }
}
