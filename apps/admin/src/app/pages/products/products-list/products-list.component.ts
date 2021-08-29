import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product, ProductsService} from "@eastblue/products";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  endSubscription$: Subject<any> = new Subject();

  constructor(private productService: ProductsService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,) { }

  ngOnInit(): void {
    this._getProducts();
  }
  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

  private _getProducts() {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((products) => {
        this.products = products;
      })
  }


  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService
          .deleteProduct(productId)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product cannot be deleted!'
            });
          }
        );
      }
    })
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }
}
