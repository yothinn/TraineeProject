import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeprofileComponent } from './employeeprofile/employeeprofile.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { DialogAddComponent } from './dialog-add/dialog-add.component';


const routes: Routes = [
  {
    path:'',
    component:AttendanceComponent

  }
]

@NgModule({
  declarations: [AttendanceComponent,EmployeeprofileComponent,EmployeelistComponent,EmployeeTableComponent, DialogAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    SharedModule,
    
  ]
})
export class AttendanceModule { }
