import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', loadChildren: () => import('./features/products/products.module').then(p => p.ProductsModule)},
  {path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(a => a.AuthModule)},
  {path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(a => a.AdminModule)},
  {path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(c => c.CartModule)},
  {path: 'check-out', loadChildren: () => import('./features/check-out/check-out.module').then(c => c.CheckOutModule)},
  {path: 'my-orders', loadChildren: () => import('./features/my-orders/my-orders.module').then(m => m.MyOrdersModule)},  
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
