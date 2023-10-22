import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";

const routes: Routes = [
    {path: '', component: MyOrdersComponent},
]
  
  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class MyOrdersRoutingModule { }