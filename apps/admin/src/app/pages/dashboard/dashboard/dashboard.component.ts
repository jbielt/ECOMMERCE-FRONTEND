import { Component, OnInit } from '@angular/core';
import {UsersService} from "@eastblue/users";
import {ProductsService} from "@eastblue/products";
import {OrdersService} from "@eastblue/orders";
import {combineLatest} from "rxjs";

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  statistics: any = [];

  constructor(private userService: UsersService,
              private productService: ProductsService,
              private orderService: OrdersService) { }

  ngOnInit(): void {
    combineLatest([
      this.orderService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.orderService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }

}
