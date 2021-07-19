import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeelistComponent } from './employeelist.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [EmployeelistComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EmployeelistModule { }
