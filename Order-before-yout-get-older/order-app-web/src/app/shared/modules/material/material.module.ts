import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTreeModule} from '@angular/material/tree';
import {MatGridListModule} from '@angular/material/grid-list';

const modules = [
  MatSlideToggleModule,
  MatButtonModule, 
  MatIconModule, 
  MatToolbarModule, 
  MatCardModule,
  MatTableModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatBadgeModule,
  MatListModule,
  MatSidenavModule, 
  MatTreeModule,
  MatGridListModule
]
@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialModule { }
