import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './core/services/breadcrumb.service';
import { CartService } from './core/services/cart.service';
import { Breadcrumb } from './shared/models/breadcrumb.model';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tableNo = 7;
  breadcrumbs: Breadcrumb[] = [];
  cartItemsLength: number = 0;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private changeDetect: ChangeDetectorRef,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getBreadcrumbs();
    this.getCartItemsCount();
  }

  private getBreadcrumbs() {
    this.breadcrumbService.breadcrumbs$
      .asObservable()
      .subscribe((breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
        this.changeDetect.detectChanges();
      });
  }

  private getCartItemsCount() {
    this.cartService.selectLength().subscribe((length) => {
      this.cartItemsLength = length;
    });
  }
}
