import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Menu } from "src/app/shared/models/menu.model";
import { MenuService } from "../services/menu.service";

@Injectable({ providedIn: 'root' })
export class MenuItemsResolver implements Resolve<Promise<void>> {
  constructor(private menuService: MenuService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<void> {
    return this.menuService.loadMenuItem();
  }
}