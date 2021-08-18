import { Component, OnInit } from '@angular/core';
import {CategoriesService, Category, Product} from "@eastblue/products";
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];

  constructor(private productService: ProductsService,
              private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
  }

  private _getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

}
