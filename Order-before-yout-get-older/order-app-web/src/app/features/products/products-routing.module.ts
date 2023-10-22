import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDetailsComponent } from "src/app/features/products/components/product-details/product-details.component";
import { ProductsComponent } from "./components/products/products.component";

const routes: Routes = [
    {path: ':category', component: ProductsComponent},
    {path: 'withId/:id', component: ProductDetailsComponent},
  ]
  
  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class ProductsRoutingModule { }