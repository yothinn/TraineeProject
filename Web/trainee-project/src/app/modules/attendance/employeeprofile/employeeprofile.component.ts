import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceService } from '../attendance.service';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  employeeData: any;

  constructor(
    private attendanceService: AttendanceService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.attendanceService.onDataChangedObservable$.subscribe((res: any) => {
      // console.log(res);
      this.employeeData = res;
      this.attendanceService.onDataChangedObservable$.subscribe((res: any) => {
        // console.log(res)
      });
      
  });
     
}

  openDialog(data1) {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      data: data1
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.attendanceService.getAttendance().subscribe((res: any) => {
          // console.log(res)
          this.employeeData = res.data;
          // console.log(this.employeeData)
        })
      }
    });
  }
  
  delete(dataDelete) {
    if (confirm("Are you sure to delete")) {
      this.attendanceService.deleteAttendance(dataDelete).subscribe((res: any) => {
        if (res) {
          this.attendanceService.getAttendance().subscribe((res: any) => {
            this.employeeData = res.data
          })
        } else {
          console.log("")
        }
      })
    }
    window.location.reload();
  }
}
