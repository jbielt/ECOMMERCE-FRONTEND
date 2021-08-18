import { Component, OnInit } from '@angular/core';
import {CategoriesService, Category, Product} from "@eastblue/products";
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;

  constructor(private productService: ProductsService,
              private categoryService: CategoriesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      params.categoryid ? this.isCategoryPage = false : this.isCategoryPage = true;
    });
    // this._getProducts();
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: any[]) {
    this.productService.getProducts(categoriesFilter).subscribe(products => {
      this.products = products;
    })
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter(category => category.checked)
      .map(category => category.id);
    this._getProducts(selectedCategories);
  }

}
