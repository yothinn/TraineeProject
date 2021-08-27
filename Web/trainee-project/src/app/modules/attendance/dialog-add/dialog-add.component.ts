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
  srcImg: any = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";
  formData: any;



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
      this.userForm = this.createForm(this.data); 
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
      jobPositions: [data.jobPositions],
      image: data.image
    });
  }

  onSubmit() {

    if (this.data._id) {
      this.attendanceService.updateAttendance(this.userForm.value)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            this.dialogRef.close();
          }
          window.location.reload();
        })
    } else {
      console.log(this.userForm.value)
      this.attendanceService.createAttendance(this.userForm.value)
        .subscribe(res => {
          if (res) {
            this.dialogRef.close();
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

    this.userForm.get('image').updateValueAndValidity()
    const reader = new FileReader();
    reader.onload = () => {
      this.srcImg = reader.result as string;
      
    }
    reader.readAsDataURL(file)

    const form = new FormData();
    form.append('files', file);
    this.formData = form;
    console.log(this.formData);
    this.attendanceService.uploadImageAttendance(this.formData)
      .subscribe((res) => {
        this.userForm.patchValue({
          image: res.data.url
        })
        console.log(res.data.url)
      })

  }
}


// onFileUpload(event) {
//     const file = event.target.files[0];
//     console.log(file);
//     const formData = new FormData();
//     formData.append('files', file);
//     this.attendanceService.uploadImageAttendance(formData)
//       .subscribe((res: any) => {
//         console.log(res.data.url)
//         this.userForm.patchValue({
//           image: res.data.url
//         });
//         console.log(this.userForm)
//         this.data.image = res.data.url;
//       });
//     }
//   }