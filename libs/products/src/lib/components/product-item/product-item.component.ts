import {Component, Input, OnInit} from '@angular/core';
import {Product} from "@eastblue/products";

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
