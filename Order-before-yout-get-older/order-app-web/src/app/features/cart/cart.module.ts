import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./components/cart/cart.component";

@NgModule({
    declarations: [
        CartComponent 
     ],
    imports: [
      CartRoutingModule,
      SharedModule
    ],
    
  })
  export class CartModule {}