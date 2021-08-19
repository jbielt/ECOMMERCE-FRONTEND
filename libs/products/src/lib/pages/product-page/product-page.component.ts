import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product, ProductsService} from "@eastblue/products";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product;
  endSubscription$: Subject<any> = new Subject<any>();
  quantity: number;

  constructor(private productService: ProductsService,
              private route: ActivatedRoute) { }

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
