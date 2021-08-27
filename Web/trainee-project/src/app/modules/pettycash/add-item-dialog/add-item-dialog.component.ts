import { Component, Inject, OnInit } from '@angular/core';
import { PettyCashService } from '../pettyCash.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';

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
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddItemDialogComponent implements OnInit {
  customerForm: FormGroup;
  pettyCashData: any;
  tableData: any;
  type: any;
  readioSelectedDeposit: boolean =true;
  readioSelectedWithdraw: boolean;
  filterData: [];


  constructor(private pettyCashService: PettyCashService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit(): void {
    if (this.data.lastName) {
      this.customerForm = this.createList(this.data);
    } else {
      this.data.image = {};
      this.customerForm = this.createList(this.data);
    }
    this.setvalue();
    this.pettyCashService.getTable().subscribe((res:any)=>{
      this.tableData=res.data
      this.filterData = this.tableData.filter(res => {
        return res.locationUse;
      });
    });
  }

  createList(data) {
    return this.fb.group({
      lastName: [data.lastName],
      date: [new Date(), Validators.required],
      documentNo: [data.documentNo, Validators.required],
      description: [data.description, Validators.required],
      deposit: [data.deposit],
      withdraw: [data.withdraw],
      placeOfUse: [data.placeOfUse, Validators.required],
      image: [data.image]

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
      }else{
        this.onFileUpload(event);
      }
    });
    window.location.reload();
  }

  onSelectDeposit() {
    this.readioSelectedDeposit = true;
    this.readioSelectedWithdraw = false;
  }
  onSelectWithdraw(){
    this.readioSelectedDeposit = false;
    this.readioSelectedWithdraw = true;

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
