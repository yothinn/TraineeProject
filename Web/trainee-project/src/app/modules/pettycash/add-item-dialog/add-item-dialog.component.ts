import { Component, Inject, OnInit } from '@angular/core';
import { PettyCashService } from '../pettyCash.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  customerForm: FormGroup;
  pettyCashData: any;
  tableData: any;
  type: any;
  radioSelectedOn: boolean = true;
  radioSelectedOf: boolean;


  constructor(private pettyCashService: PettyCashService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit(): void {
    this.data = {};
    this.data.image = "https://img-premium.flaticon.com/png/512/1176/premium/1176381.png?token=exp=1629358197~hmac=b48e7dcb72563493b8157053c8b516bb";
    this.customerForm = this.createList(this.data)
    this.setvalue();
  }

  createList(data) {
    return this.fb.group({
      lastName: [data.lastName],
      date: [new Date(), [Validators.required]],
      documentNo: [data.documentNo, Validators.required],
      description: [data.description, Validators.required],
      deposit: [data.deposit],
      withdraw: [data.withdraw],
      placeOfUse: [data.placeOfUse, Validators.required],
      Image: data.Image

    });
  }

  setvalue() {
    const form = this.customerForm
    form.controls['deposit'].setValue(0);
    form.controls['withdraw'].setValue(0);

  }

  onSubmit(): void {
    this.pettyCashService.createItem(this.customerForm.value).subscribe((res: any) => {
      this.tableData = res.data;
      if (res) {
        this.dialogRef.close(res);
      }
    });
    window.location.reload();
  }

  onSelectOn() {
    this.radioSelectedOn = true;
    this.radioSelectedOf = false;
  }
  onSelectOf() {
    this.radioSelectedOn = false;
    this.radioSelectedOf = true;
  }

  onFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('files', file);
    this.pettyCashService.uploadImage(formData)
      .subscribe((res: any) => {
        console.log(res.data.url)
        this.customerForm.patchValue({
          image: res.data.url
        });
        console.log(this.customerForm)
        this.data.image = res.data.url;
      });
  }
}