import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UsersService} from '@eastblue/users';
import { OrderItem } from '@eastblue/orders';
import {Cart, CartService, Order, OrdersService, ORDER_STATUS} from "@eastblue/orders";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string | undefined;
  countries: any = [];
  endSubscription$: Subject<any> = new Subject<any>();

  constructor(private router: Router,
              private usersService: UsersService,
              private formBuilder: FormBuilder,
              private cartService: CartService,
              private orderService: OrdersService) {}


  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._autoFillUserData();
    this._getCountries();
  }

  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _autoFillUserData() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((user) => {
        if(user) {
          this.userId = user.id;
          this.checkoutForm.name.setValue(user.name);
          this.checkoutForm.email.setValue(user.email);
          this.checkoutForm.phone.setValue(user.phone);
          this.checkoutForm.street.setValue(user.street);
          this.checkoutForm.apartment.setValue(user.apartment);
          this.checkoutForm.zip.setValue(user.zip);
          this.checkoutForm.city.setValue(user.city);
          this.checkoutForm.country.setValue(user.country);
        }
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

    this.orderService.createCheckoutSession(this.orderItems).subscribe(session => {
      console.log(session)
    })
    /*
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
    },
    () => {
      //display some message to user
      }
    );
     */
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
