import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(
    private pettyCashService: PettyCashService,
    public dialog: MatDialog, private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.pettyCashService.getTable().subscribe((res: any) => {
      this.tableData = res.data
      console.log(this.tableData)
    });
  }

}
