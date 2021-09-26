import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Order, OrderItem} from "../..";
import {Observable} from "rxjs";
import {environment} from "@env/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiURLOrders = environment.apiURL + 'orders';
  apiURLProducts = environment.apiURL + 'products';


  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders)
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`)
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(orderStatus: { status: string }, orderId: string | undefined): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
  }
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http.get<number>(`${this.apiURLOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`)
  }

  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http.post(`${this.apiURLOrders}/create-checkout-session`, orderItem);
  }
}
