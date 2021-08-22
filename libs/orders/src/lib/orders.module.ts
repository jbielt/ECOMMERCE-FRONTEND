import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from "./services/cart.service";
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {RouterModule, Routes} from "@angular/router";


import {BadgeModule} from "primeng/badge";
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BadgeModule,
    ButtonModule,
    InputNumberModule
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent
  ],
  exports: [
    CartIconComponent
  ]
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
