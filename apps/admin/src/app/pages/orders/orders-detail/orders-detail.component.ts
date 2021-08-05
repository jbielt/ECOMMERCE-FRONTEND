import { Component, OnInit } from '@angular/core';
import {Order, OrderItem, OrdersService} from "@eastblue/orders";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html'
})
export class OrdersDetailComponent implements OnInit {

  order: Order;

  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._getOrder();
  }

  private _getOrder(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.ordersService.getOrder(params.id).subscribe((order) => {
          this.order = order;
        })
      }
    });
  }




}
