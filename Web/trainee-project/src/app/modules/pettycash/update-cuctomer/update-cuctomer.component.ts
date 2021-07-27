import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PettyCashService } from '../pettyCash.service';

@Component({
  selector: 'app-update-cuctomer',
  templateUrl: './update-cuctomer.component.html',
  styleUrls: ['./update-cuctomer.component.scss']
})
export class UpdateCuctomerComponent implements OnInit {
  customerForm: FormGroup;

  constructor(private pettyCashService: PettyCashService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateCuctomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    if (this.data.name) {
      this.customerForm = this.updateList(this.data);
    } else {
      this.customerForm = this.updateList(this.data);

    }
  }

  updateList(data) {
    return this.fb.group({
      _id: [data._id],
      name: [data.name],
      lastName: [data.lastName],
      amount: [data.amount],
      limit: [data.limit]


    });
  }

  onSubmit() {
    if (this.data.name) {
      this.pettyCashService.updateCustomer(this.customerForm.value)
        .subscribe()
    } else {
      this.pettyCashService.createCustomer(this.customerForm.value)
        .subscribe()
    }
  }
}
