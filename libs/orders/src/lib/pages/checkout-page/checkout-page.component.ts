import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {User, UsersService} from '@eastblue/users';
import { OrderItem } from '../../models/orderItem';
import {Cart, CartService, Order, OrdersService, ORDER_STATUS} from "@eastblue/orders";

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = '60f2b598cd7c8d1f5c3375c0';
  countries: any = [];

  constructor(private router: Router,
              private usersService: UsersService,
              private formBuilder: FormBuilder,
              private cartService: CartService,
              private orderService: OrdersService) {}


  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['prova', Validators.required],
      email: ['prova@gmail.com', [Validators.email, Validators.required]],
      phone: ['(555) 555-4444', Validators.required],
      city: ['blanes', Validators.required],
      country: ['Albania', Validators.required],
      zip: ['4654', Validators.required],
      apartment: ['fake123', Validators.required],
      street: ['street fake', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items!.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };
    this.orderService.createOrder(order).subscribe(() => {
      //redirect to thank you page // payment page
      this.cartService.emptyCart();
      this.router.navigate(['/success']);
    });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
