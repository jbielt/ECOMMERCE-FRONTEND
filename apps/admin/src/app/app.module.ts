import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from "primeng/button";
import {TableModule} from 'primeng/table';
import {CategoriesService} from "@eastblue/products";
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';



const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule
]

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      }
    ]
  }
];

@NgModule({
  declarations: [AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {initialNavigation: 'enabledBlocking'}),
    HttpClientModule,
    UX_MODULE
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
