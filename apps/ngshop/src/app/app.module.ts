import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from "@eastblue/ui";
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import {ProductsModule} from "@eastblue/products";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'products', component: ProductListComponent}
]

@NgModule({
  declarations: [AppComponent,
                  HomePageComponent,
                  ProductListComponent,
                  HeaderComponent,
                  FooterComponent,
                  NavComponent],
  imports: [BrowserModule,
            BrowserAnimationsModule,
            RouterModule.forRoot(routes),
            UiModule,
            AccordionModule,
            ProductsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ],
})
export class AppModule {}
