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
  employeeData;


  constructor(
    private attendanceService: AttendanceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data,

  ) { }

  ngOnInit(): void {
    // console.log(this.data)
    this.attendanceService.onDataChangedObservable$.subscribe((res: any) => {
      // console.log(res);
      this.employeeData = res;
    })
    if (this.data._id) {
      this.userForm = this.createForm(this.data);
    } else {
      this.data = {};
      this.data.image = "https://img-premium.flaticon.com/png/512/1176/premium/1176381.png?token=exp=1629190815~hmac=a74c49ab6da8214076075a21b2e4201f";
      this.userForm = this.createForm(this.data)
    }
  }

  createForm(data) {
    // console.log(data)
    return this.fb.group({
      _id: [data._id],
      employeeId: [data.employeeId],
      name: [data.name],
      lastname: [data.lastname],
      tel: [data.tel],
      address: [data.address],
      age: [data.age],
      nationality: [data.nationality],
      religion: [data.religion],
      image: data.image
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
        window.location.reload();
    }
  }

  onbackClick() {
    this.dialogRef.close();
  };

  onFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('files', file);
    this.attendanceService.uploadImageAttendance(formData)
      .subscribe((res: any) => {
        // console.log(res.data.url)
        this.userForm.patchValue({
          image: res.data.url
        });
        console.log(this.userForm)
        this.data.image = res.data.url;
      });
  }
}


