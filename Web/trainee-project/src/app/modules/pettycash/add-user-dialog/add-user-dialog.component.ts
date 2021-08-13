import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PettyCashService } from '../pettyCash.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  customerForm: FormGroup;

  constructor(private pettyCashService: PettyCashService,private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    if (this.data.name) {
      this.customerForm = this.createList(this.data);
    }else {
      this.customerForm = this.createList(this.data);

    };
  }

  createList(data){
    return this.fb.group({
      name: [data.name,Validators.required] ,
      lastName: [data.lastName,Validators.required] ,
      financialAmount: [data.financialAmount,Validators.required],
      position:[data.position,Validators.required]
    });
  }

  onSubmit():void{
    if (this.data.name) {
      this.pettyCashService.updateCustomer(this.customerForm.value)
        .subscribe();
    } else {
      this.pettyCashService.createCustomer(this.customerForm.value)
        .subscribe();
    }
  }

}
