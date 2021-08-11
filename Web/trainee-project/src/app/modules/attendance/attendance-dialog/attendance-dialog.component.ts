import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceService } from '../attendance.service';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';

@Component({
  selector: 'app-attendance-dialog',
  templateUrl: './attendance-dialog.component.html',
  styleUrls: ['./attendance-dialog.component.scss']
})
export class AttendanceDialogComponent implements OnInit {

  workDateForm: FormGroup;
  employeeData: any;
  selected = 'option2';


  constructor(private attendanceService: AttendanceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data,) { }

  ngOnInit(): void {

    this.attendanceService.getAttendance().subscribe((res: any) => {
      this.employeeData = res.data;
    });
    this.workDateForm = this.createForm();
    this.workDateForm = this.createDateTimeOut();
  }


  createForm() {
    // console.log(data)
    return this.fb.group({
      employeeId: [""],
      dateIn: [""],
      timeIn: [""],
    });
  }

  createDateTimeOut() {
    // console.log(data)
    return this.fb.group({
      employeeId: [""],
      dateIn: [""],
      timeIn: [""],
    });
  }



  onSubmitIn() {
    // console.log(this.workDateForm.value)
    this.attendanceService.createDatetimeIn(this.workDateForm.value)
    .subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
      }
    })
  }

    onSubmitOut() {
    // console.log(this.workDateForm.value)
    this.attendanceService.createDatetimeOut(this.workDateForm.value)
    .subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
      }
    })
  }

 

  



}
