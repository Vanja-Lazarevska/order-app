import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
    declarations: [
     LoginComponent,
     RegisterComponent
          
    ],
    imports: [
      ReactiveFormsModule,
      AuthRoutingModule,
      SharedModule
    ],
    
  })
  export class AuthModule {}