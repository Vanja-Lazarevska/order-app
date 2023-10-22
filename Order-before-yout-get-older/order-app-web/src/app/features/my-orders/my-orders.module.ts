import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { MyOrdersRoutingModule } from "./my-orders-routing.module";

@NgModule({
    declarations: [
        MyOrdersComponent
    ],
    imports: [
      ReactiveFormsModule,
      FormsModule,
      MyOrdersRoutingModule,
      SharedModule
    ],
    
  })
  export class MyOrdersModule {}