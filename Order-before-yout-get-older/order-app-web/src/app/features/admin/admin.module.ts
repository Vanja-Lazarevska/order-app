import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { AdminComponent } from "./components/admin/admin.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";

@NgModule({
    declarations: [
        AdminComponent,
        EditProductComponent,
        AddProductComponent
          
    ],
    imports: [
      ReactiveFormsModule,
      AdminRoutingModule,
      SharedModule
    ],
    
  })
  export class AdminModule {}