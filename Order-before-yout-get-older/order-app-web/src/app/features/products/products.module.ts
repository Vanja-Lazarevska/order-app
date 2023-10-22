import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
        
  ],
  imports: [
    ReactiveFormsModule,
    ProductsRoutingModule,
    SharedModule,

  ],
  exports: [ProductDetailsComponent, ProductsComponent]
  
})
export class ProductsModule {}