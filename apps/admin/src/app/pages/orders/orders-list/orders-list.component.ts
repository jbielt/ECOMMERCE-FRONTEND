import { Component, OnInit } from '@angular/core';
import {Order, OrdersService} from "@eastblue/orders";

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    })
  }



  deleteOrder(id: string) {

  }

  showOrder(id: string) {

  }
}
