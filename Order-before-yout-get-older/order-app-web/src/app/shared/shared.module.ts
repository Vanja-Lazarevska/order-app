import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from './modules/material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductCardComponent, 
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent, 
    TableComponent,
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule { }