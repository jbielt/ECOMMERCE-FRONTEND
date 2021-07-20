import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
