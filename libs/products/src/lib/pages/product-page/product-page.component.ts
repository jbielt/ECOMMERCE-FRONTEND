import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product, ProductsService} from "@eastblue/products";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CartItem, CartService} from "@eastblue/orders";

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product;
  endSubscription$: Subject<any> = new Subject<any>();
  quantity = 1;

  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.productid) {
        this._getProduct(params.productid);
      }
    })
  }

  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

  addProductToCart(){
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(id: string) {
    this.productService
      .getProduct(id)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(product => {
      this.product = product;
    })
  }

}
