import { Component, OnInit } from '@angular/core';
import {CartService, OrdersService} from "@eastblue/orders";

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html'
})
export class ThankYouComponent implements OnInit {

  constructor(private orderService: OrdersService,
              private cartService: CartService) { }

  ngOnInit(): void {
    const orderData = this.orderService.getCacheOrderData();
    this.orderService.createOrder(orderData).subscribe(() => {
      this.cartService.emptyCart();
      this.orderService.removeCacheOrderData();
    })
  }

}
