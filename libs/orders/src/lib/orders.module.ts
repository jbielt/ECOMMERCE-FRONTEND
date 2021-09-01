import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from "./services/cart.service";
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {RouterModule, Routes} from "@angular/router";
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thankyou/thank-you/thank-you.component';
import {AuthGuard} from "@eastblue/users";



import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    component: CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankYouComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
  exports: [
    CartIconComponent
  ],
  providers: []
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
