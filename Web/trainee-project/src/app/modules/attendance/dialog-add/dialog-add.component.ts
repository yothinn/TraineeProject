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
      this.userForm = this.createForm(this.data)
    } else {
      this.userForm = this.createForm(this.data)

    }
  }
  createForm(data) {
    // console.log(data)
    return this.fb.group({
      employeeId: [data.employeeId],
      name: [data.name],
      lastname: [data.lstname],
      tel: [data.tel]
    })
  }

  Onsubmit() {
    // console.log(this.userForm.value)
    this.attendanceService.createattendan(this.userForm.value)
      .subscribe(res => {
        if (res) {
          this.dialogRef.close(res);
        }
      })
  }
  backClicked() {
    this.dialogRef.close();
  }

}

