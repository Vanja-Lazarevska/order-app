import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { CheckOutRoutingModule } from "./check-out-routing.module";
import { CheckOutComponent } from "./components/check-out/check-out.component";

@NgModule({
    declarations: [
        CheckOutComponent
    ],
    imports: [
      ReactiveFormsModule,
      FormsModule,
      CheckOutRoutingModule,
      SharedModule
    ],
    
  })
  export class CheckOutModule {}