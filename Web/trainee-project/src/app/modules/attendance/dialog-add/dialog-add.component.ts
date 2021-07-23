import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceService } from '../attendance.service';


@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private attendanceService: AttendanceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data,

  ) { }

  ngOnInit(): void {
    // console.log(this.data)
    if (this.data._id) {
      this.userForm = this.createForm(this.data);
    } else {
      this.userForm = this.createForm(this.data);

    }
  }

  createForm(data) {
    // console.log(data)
    return this.fb.group({
      _id:[data._id],
      employeeId: [data.employeeId],
      name: [data.name],
      lastname: [data.lastname],
      tel: [data.tel]
    });
  }

  onSubmit() {
    if (this.data._id) {
      this.attendanceService.updateAttendance(this.userForm.value)
        .subscribe((res) => {
          console.log(res)
          if (res) {
            this.dialogRef.close(res);
          }
        })
    } else {
      this.attendanceService.createAttendance(this.userForm.value)
        .subscribe(res => {
          if (res) {
            this.dialogRef.close(res);
          }
        })
    }
  }

  onbackClick() {
    this.dialogRef.close();
  };

}
      //this.attendanceService.createattendan().subscribe(
      //     success => alert("Done"),
      //     error => alert(error)
      //   )

