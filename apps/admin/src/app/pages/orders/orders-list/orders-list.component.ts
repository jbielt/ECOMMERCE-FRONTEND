import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order, OrdersService} from "@eastblue/orders";
import {Router} from "@angular/router";
import {ORDER_STATUS} from '@eastblue/orders'
import {ConfirmationService, MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endSubscription$: Subject<any> = new Subject();


  constructor(private ordersService: OrdersService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._getOrders();
  }
  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

  _getOrders() {
    this.ordersService.getOrders()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((orders) => {
        this.orders = orders;
      })
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService
          .deleteOrder(orderId)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        );
      }
    });
  }

  showOrder(orderId: string) {
      this.router.navigateByUrl(`orders/${orderId}`);
  }
}
