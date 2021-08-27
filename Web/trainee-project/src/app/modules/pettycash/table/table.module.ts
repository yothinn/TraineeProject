import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TableModule { }
