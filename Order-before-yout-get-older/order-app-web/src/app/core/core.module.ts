import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { OrdersService } from './services/orders/orders.service';
import { ProductsService } from './services/products/products.service';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { UsersService } from './services/users/users.service';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, NotFoundComponent, FooterComponent],
  imports: [
    SharedModule
    ],
  providers: [AuthGuard, OrdersService, ProductsService, ShoppingCartService, UsersService],
  exports: [NavbarComponent, FooterComponent]
})
export class CoreModule { }