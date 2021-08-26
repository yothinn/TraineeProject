import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeProfileComponent } from './employeeprofile/employeeprofile.component';
import { EmployeeListComponent } from './employeelist/employeelist.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
import { AttendanceDialogComponent } from './attendance-dialog/attendance-dialog.component';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


const routes: Routes = [
  {
    path:'',
    component:AttendanceComponent

  }
]

@NgModule({
  declarations: [AttendanceComponent,EmployeeProfileComponent,EmployeeListComponent, EmployeeTableComponent,DialogAddComponent, AttendanceDialogComponent],
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    SharedModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    NgxMaterialTimepickerModule
    
  ]
})
export class AttendanceModule { }
