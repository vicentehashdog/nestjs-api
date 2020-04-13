import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartService } from './cart.service';
//import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      //{ path: 'cart', component: CartComponent },
      { path: 'products/:productId', component: ProductDetailsComponent, canActivate: [AuthGuard] },
      { path: 'shipping', component: ShippingComponent, canActivate: [AuthGuard] },
      { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '' }
    ]),
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    //CartComponent,
    ShippingComponent,
    LoginComponent,
    ChatComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    CartService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/