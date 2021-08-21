import {Component, Input, OnInit} from '@angular/core';
import {Product} from "@eastblue/products";
import {CartService} from "@eastblue/orders";
import {CartItem} from "@eastblue/orders";

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem);
  }

}
