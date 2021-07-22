import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceService } from '../attendance.service';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {
  employeeData: any;

  constructor(
    private attendanceService: AttendanceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res: any) => {
      // console.log(res)
      this.employeeData = res.data
      // console.log(this.employeeData)
    })
  }
  
  // openDialog(data1) {
  //   const dialogRef = this.dialog.open(DialogAddComponent, {
  //     data: data1
  //   });
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (res) {
  //       this.attendanceService.getAttendance().subscribe((res: any) => {
  //         // console.log(res)
  //         this.employeeData = res.data
  //         // console.log(this.employeeData)
  //       })
  //     }
  //   })
  // }
}

