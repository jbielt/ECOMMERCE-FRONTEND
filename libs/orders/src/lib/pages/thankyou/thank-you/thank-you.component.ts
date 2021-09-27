import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html'
})
export class ThankYouComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /*
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
