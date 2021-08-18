import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "@eastblue/products";
import {ProductsService} from '../../services/products.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html'
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] = [];
  endSubscription$: Subject<any> = new Subject();

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

  private _getFeaturedProducts() {
    this.productService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((products) => {
        this.featuredProducts = products;
      })
  }


}
