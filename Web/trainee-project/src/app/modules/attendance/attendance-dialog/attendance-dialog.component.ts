import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceService } from '../attendance.service';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-attendance-dialog',
  templateUrl: './attendance-dialog.component.html',
  styleUrls: ['./attendance-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
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
    // this.workDateForm = this.createDateTimeOut();
  }


  createForm() {
    // console.log(data)
    return this.fb.group({
      employeeId: [""],
      date:[new Date()],
      timeIn: [""],
      work:[""]
    });
  }

  // createDateTimeOut() {
  //   // console.log(data)
  //   return this.fb.group({
  //     employeeId: [""],
  //     dateIn: [""],
  //     timeIn: [""],
  //   });
  // }

  

  onSubmit() {
    // console.log(this.workDateForm.value)
    this.attendanceService.createDateTimeIn(this.workDateForm.value)
    .subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
      }
    })
    
  }
  
  // onSubmit(buttonType) {
  //     if (buttonType==="timeIn") 
  //     { this.attendanceService.createDateTimeIn(this.workDateForm.value)
  //       .subscribe(res => {
  //       console.log(res)
  //       this.dialogRef.close(res);
  //     })
  //     }  
  //     if(buttonType==="timeOut"){ 
  //       this.attendanceService.createDateTimeOut(this.workDateForm.value)
  //       .subscribe(res => {
  //       console.log(res)
  //       this.dialogRef.close(res);
  //     })
  //     }
  // }

    // onSubmit() {
    // // console.log(this.workDateForm.value)
    // this.attendanceService.createDatetimeOut(this.workDateForm.value)
    // .subscribe(res => {
    //   if (res) {
    //     this.dialogRef.close(res);
    //   }
    // })
  // }
  // onSubmitOut() {
  //   // console.log(this.workDateForm.value)
  //   this.attendanceService.createDatetimeOut(this.workDateForm.value)
  //   .subscribe(res => {
  //     if (res) {
  //       this.dialogRef.close(res);
  //     }
  //   })
  // }

 

  



}
