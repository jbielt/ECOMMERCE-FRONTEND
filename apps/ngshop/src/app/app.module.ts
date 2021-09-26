import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import {ProductsModule} from "@eastblue/products";
import {UiModule} from "@eastblue/ui";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OrdersModule} from "@eastblue/orders";
import {JwtInterceptor, UsersModule} from "@eastblue/users";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";


import {ToastModule} from "primeng/toast";
import { MessagesComponent } from './shared/messages/messages.component';
import {MessageService} from "primeng/api";
import {NgxStripeModule} from "ngx-stripe";


const routes: Routes = [
  {path: '', component: HomePageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AccordionModule,
    ProductsModule,
    UiModule,
    OrdersModule,
    ToastModule,
    UsersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot('pk_test_51JcNIUEsKvwIzSQFmQbE2KsamtCQn6TStXu1AkViqCQ0DqrP4kw9FIR9eHWTeV7KwafAHbqEugd3dasnEsarpaer00Ly2QEqT4')
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
