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


  constructor(private pettyCashService: PettyCashService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.customerForm = this.createList(this.data);

  }

  createList(data) {
    return this.fb.group({
      pettycashsId:[data.pettycashsId],
      date: [data.date, Validators.required],
      documentNo: [data?.documentNo, Validators.required],
      list: [data?.list, Validators.required],
      deposit: [data?.deposit, Validators.required],
      withdraw: [data?.withdraw, Validators.required],
      placeOfUse: [data?.placeOfUse, Validators.required]

    });
  }

  onSubmit(): void {
    this.pettyCashService.createItem(this.customerForm.value).subscribe();
    window.location.reload();
  }
}
