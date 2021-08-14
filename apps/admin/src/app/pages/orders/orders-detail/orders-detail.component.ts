import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order, OrderItem, OrdersService} from "@eastblue/orders";
import {ActivatedRoute} from "@angular/router";
import {ORDER_STATUS} from '../order.constants';
import {MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html'
})
export class OrdersDetailComponent implements OnInit, OnDestroy {

  order: Order;
  orderStatuses: any[] = [];
  selectedStatus: any
  endSubscription$: Subject<any> = new Subject();


  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._getOrder();
    this._mapOrderStatus();
  }

  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
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
    this.ordersService
      .updateOrder({status: event.value}, this.order.id)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order status is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
    });
  }

  private _getOrder(){
    this.route.params
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(params => {
      if(params.id){
        this.ordersService
          .getOrder(params.id)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe((order) => {
            this.order = order;
            this.selectedStatus = order.status;
          })
      }
    });
  }



}
