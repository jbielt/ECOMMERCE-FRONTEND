import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { OrdersService} from "../../services/orders.service";
import { takeUntil} from "rxjs/operators";
import {CartItemDetailed, CartService} from "@eastblue/orders";

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {

  cartItemsDetailed: CartItemDetailed[] = [];

  constructor(private router: Router,
              private cartService: CartService,
              private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }


  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe((respCart) => {
      respCart.items!.forEach((cartItem) => {
        this.ordersService.getProduct(cartItem.productId!).subscribe((respProduct) => {
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity!
          })
        });
      });
    });
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem() {

  }

}
