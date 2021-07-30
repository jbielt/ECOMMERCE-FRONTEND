import { Component, OnInit } from '@angular/core';
import {Product, ProductsService} from "@eastblue/products";

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];


  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }


  deleteProduct(productId: string) {

  }

  updateProduct(productId: string) {

  }
}
