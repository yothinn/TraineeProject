import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { PettyCashService } from '../pettyCash.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from '@angular/compiler';




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  RaisedAmount = 0;
  listData: any;
  customerdata: any;
  pageEvent: any;
  array: any;
  dataSource: any;
  pageSize = 10;
  currentPage = 0;
  totalSize = 0;
  listCustomer: any;
  tableData: any;
  value: any;
  sumData: any;


  constructor(
    private pettyCashService: PettyCashService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pettyCashService.onTableChangedObservable$.subscribe((res: any) => {
      this.tableData = res;
      this.tableData.sort((x, y) => - new Date(x.date) - -new Date(y.date));
      this.findsum(this.tableData);
      console.log(this.tableData)
      // let selectedMembers = this.tableData.filter(
      //   m => new Date(m.date) >= new Date() && new Date(m.date) <= new Date()
      //   );
    });
    this.pettyCashService.onListChangedObservable$.subscribe((res: any) => {
      this.listData = res;
      console.log(res);
    });

    this.getArray();
  }
  openDialog(data): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: "400px",
      data: data

    });
    dialogRef.afterClosed().subscribe(
    );
  }

  handlePage(pagin: any): void {
    this.currentPage = pagin.pageIndex;
    this.pageSize = pagin.pageSize;
    this.shoose();
  }

  getArray(): void {
    this.pettyCashService.onTableChangedObservable$
      .subscribe((res: any) => {
        this.tableData = new MatTableDataSource<Element>(res);
        this.tableData.paginator = this.paginator;
        this.array = res;
        this.totalSize = this.array.length;
        this.shoose();
        console.log(this.totalSize);
      });
  }

  shoose(): void {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.tableData = part;
  }


  findsum(data) {
    this.RaisedAmount = 0;
    this.value = data;
    for (let j = 0; j < data.length; j++) {
      if (this.value[j].deposit) {
        this.RaisedAmount += this.value[j].deposit;
      } else {
        this.RaisedAmount -= this.value[j].withdraw;
      }
    }
  }

}
