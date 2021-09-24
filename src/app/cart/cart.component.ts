import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { CartService } from '../core/services/cart.service';
import { OrderService } from '../core/services/order.service';
import { OrderMenu } from '../shared/models/order-menu.model';

@Component({
  selector: 'gc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  orderMenus: OrderMenu[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private breadcrumbService: BreadcrumbService,
    private orderService: OrderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCartItems();
    this.breadcrumbService.breadcrumbs$.next([
      {
        text: 'Home',
        path: ['/'],
      },
      {
        text: 'Cart',
      },
    ]);
  }

  submitCart() {
    const order = this.cartService.submitCartAsOrderAndRefresh();

    this.orderService.add(order);

    this.toastrService.success('Order is now being processed');
  }

  increaseQuantity(orderMenu: OrderMenu) {
    orderMenu.quantity = orderMenu.quantity + 1;
    this.cartService.updateCart(orderMenu);
  }

  decreaseQuantity(orderMenu: OrderMenu) {
    orderMenu.quantity = orderMenu.quantity - 1;
    this.cartService.updateCart(orderMenu);
  }

  private getCartItems() {
    this.cartService.selectAll().subscribe((orderMenus) => {
      this.orderMenus = orderMenus;
      this.totalPrice = orderMenus.reduce(
        (acc, orderMenu) => acc + orderMenu.quantity * orderMenu.menu.price,
        0
      );
    });
  }
}
