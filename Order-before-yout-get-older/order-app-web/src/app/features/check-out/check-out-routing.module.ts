import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { CheckOutComponent } from "./components/check-out/check-out.component";

const routes: Routes = [
    {path: '', component: CheckOutComponent, canActivate:[AuthGuard]}, 
]
  
  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class CheckOutRoutingModule { }