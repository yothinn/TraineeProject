import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { PettyCashService } from '../pettyCash.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  PettyCashData: any;
  customerdata: any;
  filterList: any[];
  

  constructor(private pettyCashService: PettyCashService, public dialog: MatDialog) { }

  ngOnInit() {
    this.pettyCashService.getList().subscribe((res: any) => {
      // console.log(res);
      this.PettyCashData = res.data;
      // console.log(this.PettyCashData);
      this.filterList = this.PettyCashData.filter(res =>{
        return res.documentNo;
      });
    });
  }
  openDialog(data):void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data:data
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.pettyCashService.getList().subscribe();
      }
    })
  }
}