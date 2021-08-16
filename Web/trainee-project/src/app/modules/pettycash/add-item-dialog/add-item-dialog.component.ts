import { Component, Inject, OnInit } from '@angular/core';
import { PettyCashService } from '../pettyCash.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface description {
  viewValue: string;
}

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  customerForm: FormGroup;
  pettyCashData: any;
  tableData: any;
  disableSelect = new FormControl(false);

  constructor(private pettyCashService: PettyCashService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.customerForm = this.createList(this.data);
    this.setvalue()
  }

  createList(data) {
    return this.fb.group({
      lastName:[data.lastName],
      date: [data.date, Validators.required],
      documentNo: [data.documentNo, Validators.required],
      description: [data.list, Validators.required],
      deposit: [data.deposit],
      withdraw: [data.withdraw],
      placeOfUse: [data.placeOfUse, Validators.required]

    });
  }

  setvalue(){
    const form =this.customerForm
    form.controls['deposit'].setValue(0)
    form.controls['withdraw'].setValue(0)
  }

  onSubmit(): void {
    if (confirm("กรุณาเลือกรายชื่อด้านซ้ายก่อน"))
    this.pettyCashService.createItem(this.customerForm.value).subscribe((res:any)=>{
      this.tableData = res.data;
    });

  }

  descriptions: description[] = [
    {viewValue: 'deposit'},
    {viewValue: 'withdraw'},
  ];
}
