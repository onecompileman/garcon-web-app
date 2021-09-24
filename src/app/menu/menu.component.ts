import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { MenuService } from '../core/services/menu.service';
import { MenuClassification } from '../shared/enums/menu-classification.enum';

@Component({
  selector: 'gc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuClassification = MenuClassification;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.next([
      {
        text: 'Home',
        path: ['/'],
      },
      {
        text: 'Menu',
      },
    ]);
  }
}
