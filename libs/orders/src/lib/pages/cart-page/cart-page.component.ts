import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "@eastblue/orders";
import { takeUntil} from "rxjs/operators";
import {ProductsService} from "@eastblue/products";

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {

  constructor(private router: Router,
              private cartService: CartService,
              private productService: ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe(cart => {
      cart.items?.forEach(cartItem => {
        this.productService.getProduct(cartItem.productId!).subscribe(product => {

        })
      })
    })
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem() {

  }

}
