import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "@eastblue/users";
import {ProductsService} from "@eastblue/products";
import {OrdersService} from "@eastblue/orders";
import {combineLatest, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  statistics: any = [];
  endSubscription$: Subject<any> = new Subject();

  constructor(private userService: UsersService,
              private productService: ProductsService,
              private orderService: OrdersService) { }

  ngOnInit(): void {
    combineLatest([
      this.orderService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.orderService.getTotalSales()
    ])
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((values) => {
      this.statistics = values;
    });
  }

  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

}
