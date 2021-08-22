import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { OrdersService} from "../../services/orders.service";
import { takeUntil} from "rxjs/operators";
import {CartItemDetailed, CartService} from "@eastblue/orders";
import {Subject} from "rxjs";

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubscription$: Subject<any> = new Subject;

  constructor(private router: Router,
              private cartService: CartService,
              private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }


  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubscription$)).subscribe((respCart) => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items!.length ?? 0;
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

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

}
