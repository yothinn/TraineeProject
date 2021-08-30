import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { PettyCashService } from '../pettyCash.service';

@Component({
  selector: 'app-dialog-check-bill',
  templateUrl: './dialog-check-bill.component.html',
  styleUrls: ['./dialog-check-bill.component.scss']
})
export class DialogCheckBillComponent implements OnInit {
  tableData: any;
  filterData: [];
  customerForm: FormGroup;

  constructor(
    private pettyCashService: PettyCashService,
    public dialog: MatDialog, private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.pettyCashService.onImageChangedObservable$.subscribe((res: any) => {
      this.tableData = res;
      console.log(this.tableData)
      // this.filterData = this.tableData.filter(res)
      // return res.image;
    });
    
  }
}
