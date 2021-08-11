import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { AttendanceDialogComponent } from './attendance-dialog/attendance-dialog.component';
import { AttendanceService } from './attendance.service';
import { DialogAddComponent } from './dialog-add/dialog-add.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('leftSide') left: MatDrawer;
  @ViewChild('rightSide') right: MatDrawer;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  employeeData: any;
  profileForm: FormGroup;

  constructor(
    private attendanceService: AttendanceService,
    public dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res: any) => {
      // console.log(res)
      this.employeeData = res.data;
      // console.log(this.employeeData)
    })
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
        });
      }
    })
  }

  toggleLeft(): void {
    this.left.toggle();
  }
  toggleRight(): void {
    this.right.toggle();
  }
  openDialogAttendance() {
    const dialogRef = this.dialog.open(AttendanceDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`)
    });
  }
  onFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('files', file);
    this.attendanceService.uploadImageAttendance(formData)
      .subscribe((res) => {
        console.log(res);
      })
    // this.attendanceService.uploadImageAttendance(this.profileForm.value)
  }
}


