import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { AdminComponent } from "./components/admin/admin.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";

const routes: Routes = [
    {path: '', component: AdminComponent, canActivate:[AuthGuard]},
    {path: 'edit-product/:id', component: EditProductComponent, canActivate:[AuthGuard]},
  ]
  
  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }