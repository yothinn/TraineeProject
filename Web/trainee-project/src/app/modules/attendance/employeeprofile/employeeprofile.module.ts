import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeprofileComponent } from './employeeprofile.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [EmployeeprofileComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EmployeeprofileModule { }
