import { Component, OnInit } from '@angular/core';
import {Category} from "@eastblue/products";
import {Subject} from "rxjs";
import { CategoriesService } from '../../services/categories.service';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html'
})
export class CategoriesBannerComponent implements OnInit {

  categories: Category[] = [];
  endSubscription$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(categories => {
        this.categories = categories;
      })
  }

  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }


}
