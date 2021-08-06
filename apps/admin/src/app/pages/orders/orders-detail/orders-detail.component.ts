import { Component, OnInit } from '@angular/core';
import {Order, OrderItem, OrdersService} from "@eastblue/orders";
import {ActivatedRoute} from "@angular/router";
import {ORDER_STATUS} from '../order.constants';
import {MessageService} from "primeng/api";

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html'
})
export class OrdersDetailComponent implements OnInit {

  order: Order;
  orderStatuses: any[] = [];
  selectedStatus: any;

  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._getOrder();
    this._mapOrderStatus();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    });
  }

  onStatusChange(event: any) {
    this.ordersService.updateOrder({status: event.value}, this.order.id).subscribe(
      () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order status is updated!'
      });
    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Order is not updated!'
      });
    });
  }

  private _getOrder(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.ordersService.getOrder(params.id).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        })
      }
    });
  }




}
